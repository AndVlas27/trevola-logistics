type ConsentCopy = {
  title: string
  message: string
  accept: string
  reject: string
  preferences: string
  settingsTitle: string
  analytics: string
  analyticsDescription: string
  save: string
  close: string
  manage: string
  cookiePolicy: string
}

const copy: Record<string, ConsentCopy> = {
  en: { title: 'Optional cookies', message: 'Analytics runs only if you allow it. Change your choice any time.', accept: 'Accept analytics', reject: 'Reject optional', preferences: 'Preferences', settingsTitle: 'Privacy preferences', analytics: 'Website analytics', analyticsDescription: 'Google Analytics 4, Microsoft Clarity and Cloudflare Web Analytics. No advertising or marketing tracking is enabled.', save: 'Save choices', close: 'Close', manage: 'Cookie preferences', cookiePolicy: 'Cookie policy' },
  pt: { title: 'Cookies opcionais', message: 'A análise só é ativada se autorizar. Pode alterar a escolha quando quiser.', accept: 'Aceitar análise', reject: 'Rejeitar opcionais', preferences: 'Preferências', settingsTitle: 'Preferências de privacidade', analytics: 'Análise do site', analyticsDescription: 'Google Analytics 4, Microsoft Clarity e Cloudflare Web Analytics. Não ativamos publicidade nem acompanhamento de marketing.', save: 'Guardar escolhas', close: 'Fechar', manage: 'Preferências de cookies', cookiePolicy: 'Política de cookies' },
  de: { title: 'Optionale Cookies', message: 'Die Analyse wird nur mit Ihrer Zustimmung aktiviert. Sie können Ihre Auswahl jederzeit ändern.', accept: 'Analyse akzeptieren', reject: 'Optionale ablehnen', preferences: 'Einstellungen', settingsTitle: 'Datenschutzeinstellungen', analytics: 'Website-Analyse', analyticsDescription: 'Google Analytics 4, Microsoft Clarity und Cloudflare Web Analytics. Werbung und Marketing-Tracking sind deaktiviert.', save: 'Auswahl speichern', close: 'Schließen', manage: 'Cookie-Einstellungen', cookiePolicy: 'Cookie-Richtlinie' },
  fr: { title: 'Cookies facultatifs', message: 'La mesure est activée uniquement avec votre accord. Vous pouvez modifier votre choix à tout moment.', accept: 'Accepter la mesure', reject: 'Refuser les options', preferences: 'Préférences', settingsTitle: 'Préférences de confidentialité', analytics: 'Mesure du site', analyticsDescription: 'Google Analytics 4, Microsoft Clarity et Cloudflare Web Analytics. Aucun suivi publicitaire ou marketing n’est activé.', save: 'Enregistrer mes choix', close: 'Fermer', manage: 'Préférences des cookies', cookiePolicy: 'Politique relative aux cookies' },
  ru: { title: 'Необязательные файлы cookie', message: 'Аналитика включается только с вашего согласия. Вы можете изменить выбор в любое время.', accept: 'Разрешить аналитику', reject: 'Отклонить необязательное', preferences: 'Настройки', settingsTitle: 'Настройки конфиденциальности', analytics: 'Аналитика сайта', analyticsDescription: 'Google Analytics 4, Microsoft Clarity и Cloudflare Web Analytics. Рекламное и маркетинговое отслеживание отключено.', save: 'Сохранить выбор', close: 'Закрыть', manage: 'Настройки файлов cookie', cookiePolicy: 'Политика файлов cookie' },
  uk: { title: 'Необов’язкові файли cookie', message: 'Аналітика вмикається лише за вашою згодою. Ви можете змінити вибір будь-коли.', accept: 'Дозволити аналітику', reject: 'Відхилити необов’язкове', preferences: 'Налаштування', settingsTitle: 'Налаштування конфіденційності', analytics: 'Аналітика сайту', analyticsDescription: 'Google Analytics 4, Microsoft Clarity і Cloudflare Web Analytics. Рекламне та маркетингове відстеження вимкнено.', save: 'Зберегти вибір', close: 'Закрити', manage: 'Налаштування файлів cookie', cookiePolicy: 'Політика файлів cookie' },
}

const storageKey = 'trevola-analytics-consent-v1'
const ids = {
  ga4: (import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '').trim(),
  clarity: (import.meta.env.VITE_CLARITY_PROJECT_ID ?? '').trim(),
  cloudflare: (import.meta.env.VITE_CF_WEB_ANALYTICS_TOKEN ?? '').trim(),
}
const configured = {
  ga4: /^G-[A-Z0-9]+$/i.test(ids.ga4),
  clarity: /^[a-z0-9]+$/i.test(ids.clarity),
  cloudflare: /^[a-z0-9_-]+$/i.test(ids.cloudflare),
}
const hasAnalytics = Object.values(configured).some(Boolean)

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

function getConsent(): boolean | null {
  try {
    const value = localStorage.getItem(storageKey)
    if (!value) return null
    const consent = JSON.parse(value) as { analytics?: unknown }
    return typeof consent.analytics === 'boolean' ? consent.analytics : null
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean) {
  try { localStorage.setItem(storageKey, JSON.stringify({ analytics, savedAt: new Date().toISOString() })) } catch { /* Consent stays denied if storage is unavailable. */ }
}

function loadAnalytics() {
  if (configured.ga4 && !document.querySelector('[data-trevola-ga4]')) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) { window.dataLayer?.push(args) }
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('js', new Date())
    window.gtag('config', ids.ga4, { send_page_view: true, allow_google_signals: false, allow_ad_personalization_signals: false })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga4)}`
    script.dataset.trevolaGa4 = 'true'
    document.head.append(script)
  }

  if (configured.clarity && !document.querySelector('[data-trevola-clarity]')) {
    window.clarity = window.clarity || Object.assign((...args: unknown[]) => { window.clarity?.q?.push(args) }, { q: [] as unknown[][] })
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(ids.clarity)}`
    script.dataset.trevolaClarity = 'true'
    document.head.append(script)
  }

  if (configured.cloudflare && !document.querySelector('[data-trevola-cloudflare]')) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.defer = true
    script.dataset.cfBeacon = JSON.stringify({ token: ids.cloudflare })
    script.dataset.trevolaCloudflare = 'true'
    document.head.append(script)
  }
}

function stopAnalytics() {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' })
  document.querySelectorAll('[data-trevola-ga4], [data-trevola-clarity], [data-trevola-cloudflare]').forEach(script => script.remove())
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0]?.trim() ?? ''
    if (/^(_ga($|_)|_clck$|_clsk$)/.test(name)) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.trevolalogistics.com; SameSite=Lax`
    }
  })
}

export function trackQuoteSuccess(clientType?: string) {
  if (getConsent() !== true || !configured.ga4) return
  const client_type = clientType === 'company' || clientType === 'individual' ? clientType : undefined
  if (client_type) window.gtag?.('event', 'generate_lead', { client_type })
  else window.gtag?.('event', 'generate_lead')
}

export function initializeAnalyticsConsent() {
  if (!hasAnalytics || document.getElementById('analytics-consent-banner')) return
  const locale = document.documentElement.lang.toLowerCase().split('-')[0]
  const text = copy[locale] ?? copy.en
  const banner = document.createElement('aside')
  banner.id = 'analytics-consent-banner'
  banner.className = 'analytics-consent-banner'
  banner.setAttribute('aria-label', text.title)
  banner.innerHTML = `<div class="analytics-consent-copy"><strong>${text.title}</strong><p>${text.message} <a href="${new URL('cookies.html', location.href).pathname}">${text.cookiePolicy}</a></p></div><div class="analytics-consent-actions"><button type="button" class="consent-button consent-reject" data-consent-reject>${text.reject}</button><button type="button" class="consent-button consent-preferences" data-consent-open>${text.preferences}</button><button type="button" class="consent-button consent-accept" data-consent-accept>${text.accept}</button></div>`
  const dialog = document.createElement('dialog')
  dialog.id = 'analytics-consent-dialog'
  dialog.className = 'analytics-consent-dialog'
  dialog.setAttribute('aria-labelledby', 'analytics-consent-title')
  dialog.innerHTML = `<form method="dialog"><button type="submit" class="consent-dialog-close" aria-label="${text.close}">×</button></form><h2 id="analytics-consent-title">${text.settingsTitle}</h2><label class="consent-toggle"><input type="checkbox" name="analytics"><span><strong>${text.analytics}</strong><small>${text.analyticsDescription}</small></span></label><div class="analytics-consent-actions"><button type="button" class="consent-button consent-reject" data-consent-reject>${text.reject}</button><button type="button" class="consent-button consent-accept" data-consent-save>${text.save}</button></div>`

  document.body.append(banner, dialog)
  const analyticsToggle = dialog.querySelector<HTMLInputElement>('input[name="analytics"]')!
  const hideBanner = () => { banner.hidden = true }
  const setChoice = (accepted: boolean) => {
    saveConsent(accepted)
    if (accepted) loadAnalytics()
    else stopAnalytics()
    hideBanner()
    if (dialog.open) dialog.close()
  }
  banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => setChoice(true))
  banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => setChoice(false))
  banner.querySelector('[data-consent-open]')?.addEventListener('click', () => { analyticsToggle.checked = getConsent() === true; dialog.showModal() })
  dialog.querySelector('[data-consent-reject]')?.addEventListener('click', () => setChoice(false))
  dialog.querySelector('[data-consent-save]')?.addEventListener('click', () => setChoice(analyticsToggle.checked))
  const manage = document.createElement('button')
  manage.type = 'button'
  manage.className = 'analytics-consent-manage'
  manage.textContent = text.manage
  manage.addEventListener('click', () => { analyticsToggle.checked = getConsent() === true; dialog.showModal() })
  document.querySelector('.footer-bottom')?.append(manage)

  const choice = getConsent()
  if (choice === true) {
    loadAnalytics()
    banner.hidden = true
  }
  else if (choice === false) banner.hidden = true
}
