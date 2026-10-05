const INBOX = 'info@trevolalogistics.com'
const MAX_BODY_BYTES = 20_000
const MAX_FIELD_LENGTH = 2_000
const ALLOWED_TRANSPORTS = new Set(['FTL', 'LTL', 'Express', 'Dedicated'])

export const config = { runtime: 'edge' }

const json = (status, body) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' },
})

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

function validate(data) {
  const required = [
    'company', 'contact', 'email', 'phone', 'pickupCountry', 'pickupCity',
    'deliveryCountry', 'deliveryCity', 'transport', 'cargo', 'pallets',
    'weight', 'volume', 'loadingDate', 'additional',
  ]
  if (!data || typeof data !== 'object' || Array.isArray(data)) return 'invalid'
  if (required.some((key) => typeof data[key] !== 'string' || !data[key].trim())) return 'missing'
  if (required.some((key) => data[key].length > MAX_FIELD_LENGTH)) return 'too_long'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'email'
  if (!ALLOWED_TRANSPORTS.has(data.transport)) return 'transport'
  if (!Number.isInteger(Number(data.pallets)) || Number(data.pallets) < 1) return 'pallets'
  if (!Number.isFinite(Number(data.weight)) || Number(data.weight) <= 0) return 'weight'
  if (!Number.isFinite(Number(data.volume)) || Number(data.volume) <= 0) return 'volume'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.loadingDate)) return 'date'
  const loadingDate = new Date(`${data.loadingDate}T00:00:00Z`)
  if (Number.isNaN(loadingDate.getTime()) || loadingDate.toISOString().slice(0, 10) !== data.loadingDate) return 'date'
  if (data.loadingDate < new Date().toISOString().slice(0, 10)) return 'date'
  if (data.website) return 'spam'
  return ''
}

export default async function handler(request) {
    if (request.method !== 'POST') {
      return json(405, { error: 'method_not_allowed' })
    }

    const origin = request.headers.get('origin')
    if (origin && origin !== new URL(request.url).origin) {
      return json(403, { error: 'origin_not_allowed' })
    }

    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return json(415, { error: 'content_type_not_supported' })
    }

    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json(413, { error: 'request_too_large' })
    }

    let data
    try {
      data = JSON.parse(rawBody)
    } catch {
      return json(400, { error: 'invalid_request' })
    }

    const validationError = validate(data)
    if (validationError === 'spam') return json(202, { ok: true })
    if (validationError) return json(400, { error: validationError })

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    if (!apiKey || !from) {
      return json(503, { error: 'email_not_configured' })
    }

    const fields = [
      ['Company', data.company], ['Contact person', data.contact], ['Email', data.email],
      ['Phone', data.phone], ['Pickup country', data.pickupCountry], ['Pickup city', data.pickupCity],
      ['Delivery country', data.deliveryCountry], ['Delivery city', data.deliveryCity],
      ['Transport', data.transport], ['Cargo', data.cargo], ['Pallets', data.pallets],
      ['Weight (kg)', data.weight], ['Volume (m³)', data.volume],
      ['Preferred loading date', data.loadingDate], ['Additional information', data.additional],
    ]
    const text = fields.map(([label, value]) => `${label}:\n${value}`).join('\n\n')
    const html = fields.map(([label, value]) =>
      `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e1e7e9">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e1e7e9">${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`,
    ).join('')

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID(),
        },
        body: JSON.stringify({
          from: `Trevola Logistics Website <${from}>`,
          to: [INBOX],
          reply_to: data.email,
          subject: `Road freight quote request · ${data.pickupCity} to ${data.deliveryCity}`,
          text,
          html: `<div style="font-family:Arial,sans-serif;color:#172633"><h2>New Trevola Logistics quote request</h2><table style="border-collapse:collapse;width:100%">${html}</table></div>`,
        }),
        signal: AbortSignal.timeout(8_000),
      })

      if (!response.ok) {
        return json(502, { error: 'email_delivery_failed' })
      }
      return json(202, { ok: true })
    } catch {
      return json(502, { error: 'email_delivery_failed' })
    }
}
