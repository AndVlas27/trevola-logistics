import './style.css'
import heroImage from './assets/images/hero-production.jpg'
import aboutImage from './assets/images/trevola-loading-production.jpg'
import warehouseImage from './assets/images/warehouse-concept-production.jpg'
import logo from './assets/logo/trevola-logo-production.png'

import { languageOptions, translations, type Language } from './i18n'
import { pageUrl } from './routes'
import { siteCopy } from './page-copy'

const services = [
  { icon: 'truck', title: 'service1Title', text: 'service1Text' },
  { icon: 'boxes', title: 'service2Title', text: 'service2Text' },
  { icon: 'clock', title: 'service3Title', text: 'service3Text' },
  { icon: 'route', title: 'service4Title', text: 'service4Text' },
  { icon: 'globe', title: 'service5Title', text: 'service5Text' },
  { icon: 'support', title: 'service6Title', text: 'service6Text' },
]

const advantages = [
  { icon: 'globe', title: 'why1Title', text: 'why1Text' },
  { icon: 'shield', title: 'why2Title', text: 'why2Text' },
  { icon: 'message', title: 'why3Title', text: 'why3Text' },
  { icon: 'arrows', title: 'why4Title', text: 'why4Text' },
  { icon: 'person', title: 'why5Title', text: 'why5Text' },
  { icon: 'heart', title: 'why6Title', text: 'why6Text' },
]

const industriesServed = [
  { icon: 'car', title: 'industry1Title', text: 'industry1Text' },
  { icon: 'wheat', title: 'industry2Title', text: 'industry2Text' },
  { icon: 'industry', title: 'industry3Title', text: 'industry3Text' },
  { icon: 'cart', title: 'industry4Title', text: 'industry4Text' },
  { icon: 'food', title: 'industry5Title', text: 'industry5Text' },
  { icon: 'package', title: 'industry6Title', text: 'industry6Text' },
]

const processSteps = [
  { icon: 'mail', title: 'process1Title', text: 'process1Text' },
  { icon: 'route', title: 'process2Title', text: 'process2Text' },
  { icon: 'truck', title: 'process3Title', text: 'process3Text' },
  { icon: 'pin', title: 'process4Title', text: 'process4Text' },
]

const iconPaths: Record<string, string> = {
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  truck: '<path d="M3 6h11v12H3zM14 10h4l3 3v5h-7z"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/>',
  boxes: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h5a4 4 0 0 0 4-4V8"/>',
  support: '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5ZM17 19a5 5 0 0 1-5 2h-1"/>',
  person: '<circle cx="12" cy="8" r="3"/><path d="M5 20a7 7 0 0 1 14 0M19 8l2 2-2 2"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  arrows: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  car: '<path d="m5 11 1.5-4h11L19 11l2 2v5h-2v2h-2v-2H7v2H5v-2H3v-5l2-2Z"/><path d="M6.5 14h.01M17.5 14h.01M6 11h12"/>',
  wheat: '<path d="M12 22V3M12 8C7 8 5 6 5 3c4 0 7 2 7 5ZM12 13c-5 0-7-2-7-5 4 0 7 2 7 5ZM12 8c5 0 7-2 7-5-4 0-7 2-7 5ZM12 14c5 0 7-2 7-5-4 0-7 2-7 5Z"/>',
  industry: '<path d="M3 21V9l6 3V8l6 4V5l6 3v13H3Z"/><path d="M7 17h2m3 0h2m3 0h2M17 5V3h3v4"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M2 3h2l3 12h12l3-9H5"/><path d="M7 15l-1 3h14"/>',
  food: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3v18M17 3c3 2 4 6 4 10h-4"/>',
  package: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.7L7.2 10.3a16 16 0 0 0 6 6l1.8-1.8a2 2 0 0 1 1.7-.6l3.1.5a2 2 0 0 1 2.2 2.5Z"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
  whatsapp: '<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"/><path d="M8.5 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4l.8 1.8c.1.3 0 .5-.1.7l-.5.6c-.2.2-.3.4-.1.7a7 7 0 0 0 1.4 1.7c.6.5 1.1.8 1.5.9.3.1.5.1.7-.2l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.2.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.5-1.2.7-1.8.7-.5 0-1.2-.1-2-.5-.8-.3-1.8-.9-2.9-1.9-1-.9-1.7-2-2-2.7-.4-.8-.5-1.5-.5-2.1 0-.6.2-1.1.6-1.5Z"/>',
}

const icon = (name: string, className = '') => `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] ?? iconPaths.arrow}</svg>`
const storedLanguage = (() => {
  try { return localStorage.getItem('trevola-language') } catch { return null }
})()
const declaredLanguage = document.body.dataset.locale ?? location.pathname.split('/').filter(Boolean)[0]
let currentLanguage: Language = languageOptions.some(({ code }) => code === declaredLanguage) ? declaredLanguage as Language : languageOptions.some(({ code }) => code === storedLanguage) ? storedLanguage as Language : 'pt'
const app = document.querySelector<HTMLDivElement>('#app')!
const t = (key: string) => translations[currentLanguage][key] ?? translations.en[key] ?? key

function mapGraphic() {
  return `<svg class="europe-map" viewBox="0 0 680 410" role="img" aria-labelledby="map-title map-desc">
    <title id="map-title">${t('mapTitle')} ${t('mapAccent')}</title>
    <desc id="map-desc">${t('mapCoverageNote')}</desc>
    <defs><pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="currentColor" stroke-opacity=".055" stroke-width="1"/></pattern></defs>
    <rect width="680" height="410" rx="24" fill="url(#map-grid)"/>
    <path class="map-land" d="m116 231 18-28-3-38 25-34 36-11 16-36 31-13 34 14 34-16 34 20 28-9 35 20 36-6 22 22 36 5 18 31 34 10 16 32-18 23-28 5-19 31-38 3-18 28-27 8-5 37-25 6-17-27-27-1-12-28-23-7-10-40-26-11-12-38-28-7-8 35-22 23-20-9 4-33-17-13-20 13-19-10-16 19-29-9-23 15-22-3-19-15Z"/>
    <g class="map-countries" aria-hidden="true"><path d="m190 242 24-17 23 12-5 27-30 11-17-14Z"/><path d="m215 225 20-20 29 8 9 24-36 0Z"/><path d="m239 253 32-16 25 16-10 31-37 4Z"/><path d="m264 208 23-20 25 11 5 24-25 10-20-6Z"/><path d="m296 229 29-12 23 13-3 28-36 8-17-17Z"/><path d="m325 213 25-10 25 17-8 24-22 14-20-20Z"/><path d="m349 254 26-14 24 18-3 33-24 14-21-19Z"/><path d="m377 227 28-16 22 17-5 28-25 2Z"/><path d="m405 211 24-16 25 13 1 28-29 8Z"/><path d="m434 199 28-9 20 16-8 23-20-3Z"/><path d="m461 187 22-16 24 15-3 25-22-5Z"/><path d="m486 170 26-10 18 20-10 22-22-3Z"/><path d="m272 285 22-8 18 17-5 28-24 5-16-22Z"/><path d="m299 301 28-8 19 15-8 24-24 3Z"/><path d="m348 299 25-8 21 20-9 24-24-4Z"/><path d="m217 272 28-2 15 20-12 21-22-7Z"/><path d="m179 256 25 3-4 25-20 11-14-17Z"/><path d="m388 266 26-7 19 17-8 25-24-3Z"/><path d="m422 254 28-4 18 19-10 20-28-2Z"/><path d="m456 244 29-7 17 17-10 24-28-5Z"/><path d="m492 230 25-7 18 16-13 21-27-5Z"/><path d="m330 178 25-8 18 15-9 19-25 1Z"/><path d="m365 176 25-9 20 15-7 20-26-1Z"/><path d="m402 172 23-11 22 15-5 18-25 3Z"/><path d="m447 166 22-8 18 15-4 14-24 0Z"/></g>
    <path class="map-route map-route-muted" d="M126 304 C195 296 222 247 280 218 S373 184 421 157 494 120 560 95"/>
    <path class="map-route" d="M126 304 C180 292 197 278 221 255 S267 227 280 218 335 198 373 184 398 168 421 157 461 140 490 126 530 107 560 95"/>
    <path class="map-route map-route-muted" d="M280 218 C310 247 331 279 345 320"/>
    <g class="map-point map-point-origin"><circle cx="126" cy="304" r="10"/><circle cx="126" cy="304" r="3"/></g>
    <g class="map-point"><circle cx="221" cy="255" r="7"/><circle cx="221" cy="255" r="2"/></g>
    <g class="map-point"><circle cx="280" cy="218" r="7"/><circle cx="280" cy="218" r="2"/></g>
    <g class="map-point"><circle cx="421" cy="157" r="7"/><circle cx="421" cy="157" r="2"/></g>
    <g class="map-point"><circle cx="490" cy="126" r="7"/><circle cx="490" cy="126" r="2"/></g>
    <g class="map-point"><circle cx="560" cy="95" r="7"/><circle cx="560" cy="95" r="2"/></g>
    <g class="map-point"><circle cx="345" cy="320" r="7"/><circle cx="345" cy="320" r="2"/></g>
    <text class="map-label map-label-origin" x="82" y="337">${t('countryPortugal')}</text>
    <text class="map-label" x="173" y="278">${t('countrySpain')}</text>
    <text class="map-label" x="248" y="199">${t('countryFrance')}</text>
    <text class="map-label" x="383" y="183">${t('countryBelgium')}</text>
    <text class="map-label" x="461" y="109">${t('countryNetherlands')}</text>
    <text class="map-label" x="526" y="77">${t('countryGermany')}</text>
    <text class="map-label" x="326" y="350">${t('countryItaly')}</text>
  </svg>`
}

function observeReveals() {
  const revealItems = app.querySelectorAll<HTMLElement>('[data-reveal]')
  const counters = app.querySelectorAll<HTMLElement>('[data-count]')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'))
    counters.forEach((counter) => { counter.textContent = formatCounter(Number(counter.dataset.count ?? 0), counter) })
    return
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' })

  revealItems.forEach((item) => revealObserver.observe(item))

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const counter = entry.target as HTMLElement
      const target = Number(counter.dataset.count ?? 0)
      const start = performance.now()
      const duration = 1150
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 4
        counter.textContent = formatCounter(Math.round(target * eased), counter)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      observer.unobserve(counter)
    })
  }, { threshold: 0.55 })

  counters.forEach((counter) => statsObserver.observe(counter))
}

function formatCounter(value: number, element: HTMLElement) {
  return element.dataset.format === 'grouped' ? new Intl.NumberFormat('en-US').format(value) : String(value)
}

function render() {
  document.documentElement.lang = currentLanguage === 'pt' ? 'pt-PT' : currentLanguage
  document.title = t('pageTitle')
  const pageDescription = t('pageDescription')
  if (!document.querySelector('link[rel="preload"][href="' + heroImage + '"]')) {
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.as = 'image'
    preload.href = heroImage
    document.head.append(preload)
  }
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', pageDescription)
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', t('pageTitle'))
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', pageDescription)

  app.innerHTML = `
    <a class="skip-link" href="#main-content">${t('skip')}</a>
    <div class="utility-bar"><div class="container utility-inner"><a href="mailto:info@trevolalogistics.com">${icon('mail')}<span>info@trevolalogistics.com</span></a><span class="utility-divider" aria-hidden="true"></span><a href="tel:+351928338946">${icon('phone')}<span>+351 928 338 946</span></a></div></div>
    <header class="site-header">
      <nav class="navbar container" aria-label="${t('navLabel')}">
        <a class="brand" href="${pageUrl(currentLanguage, 'home')}" aria-label="${t('homeLabel')}"><img src="${logo}" alt="Trevola Logistics" width="800" height="267" decoding="async"></a>
        <button class="menu-toggle" type="button" aria-label="${t('menuOpen')}" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span><span></span></button>
        <div class="nav-panel" id="primary-navigation"><ul class="nav-links"><li><a href="about-us.html">${t('navAbout')}</a></li><li><a href="services.html">${t('navServices')}</a></li><li><a href="fleet.html">${t('navNetwork')}</a></li><li><a href="industries.html">${t('navWhy')}</a></li><li><a href="contact.html">${t('navContact')}</a></li></ul><div class="nav-tools"><label class="language-control">${icon('globe')}<span class="sr-only">${t('languageLabel')}</span><select class="language-select" aria-label="${t('languageLabel')}">${languageOptions.map(({ code, label }) => `<option value="${code}" ${code === currentLanguage ? 'selected' : ''}>${label}</option>`).join('')}</select></label><a class="nav-cta" href="request-a-quote.html">${t('requestQuote')} ${icon('arrow')}</a></div></div>
      </nav>
    </header>

    <main id="main-content">
      <section id="home" class="hero" style="--hero-image:url('${heroImage}')" aria-labelledby="hero-title">
        <div class="hero-shade" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy">
          <span class="hero-badge"><span class="badge-dot"></span>${t('heroBadge')}</span>
          <h1 id="hero-title">${t('heroTitle')}<br><em>${t('heroAccent')}</em></h1>
          <p>${t('heroDescription')}</p>
          <div class="hero-actions"><a class="button button-primary" href="#contact">${t('heroPrimary')} ${icon('arrow')}</a><a class="button button-secondary" href="#services">${t('heroSecondary')} ${icon('arrow')}</a></div>
          <div class="hero-proof"><span class="proof-icon">${icon('route')}</span><span><strong>${t('heroProof')}</strong><small>${t('heroProofText')}</small></span></div>
        </div></div><a class="scroll-cue" href="#about"><span aria-hidden="true"></span>${t('heroScroll')}</a><span class="hero-index" aria-hidden="true">01 <i></i> 05</span>
      </section>

      <section id="about" class="about section-pad" aria-labelledby="about-title"><div class="container about-grid">
        <div class="about-visual" data-reveal><img src="${aboutImage}" alt="${t('aboutImageAlt')}" width="1536" height="1024" loading="lazy" decoding="async"><div class="visual-caption"><span class="caption-icon">${icon('pin')}</span><span><strong>${t('basedPortugal')}</strong><small>${t('connectedEurope')}</small></span></div><div class="visual-accent" aria-hidden="true"></div></div>
        <div class="about-copy" data-reveal><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('aboutEyebrow')}</span><h2 id="about-title">${t('aboutTitle')}<br><em>${t('aboutAccent')}</em></h2><p class="lead">${t('aboutLead')}</p><p>${t('aboutBody')}</p><a class="text-link" href="#contact">${t('aboutLink')} ${icon('arrow')}</a></div>
      </div></section>

      <section class="stats-band" aria-label="${t('statsEyebrow')}"><div class="container stats-grid"><div class="stats-intro" data-reveal><span class="eyebrow eyebrow-light"><span class="eyebrow-line" aria-hidden="true"></span>${t('statsEyebrow')}</span><h2>${t('statsTitle')}<em>${t('statsAccent')}</em></h2></div><div class="stat-item" data-reveal><strong><span data-count="25">0</span>+</strong><span>${t('statCountries')}</span></div><div class="stat-item" data-reveal><strong><span data-count="24">0</span>/7</strong><span>${t('statSupport')}</span></div><div class="stat-item" data-reveal><strong><span data-count="10000" data-format="grouped">0</span>+</strong><span>${t('statShipments')}</span></div><div class="stat-item" data-reveal><strong><span data-count="99">0</span>%</strong><span>${t('statOnTime')}</span></div></div></section>

      <section id="services" class="services section-pad" aria-labelledby="services-title"><div class="container"><div class="section-heading" data-reveal><div><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('servicesEyebrow')}</span><h2 id="services-title">${t('servicesTitle')}<br><em>${t('servicesAccent')}</em></h2></div><p>${t('servicesDescription')}</p></div><div class="service-grid">${services.map((service, index) => `<article class="service-card" data-reveal style="--reveal-delay:${index * 65}ms"><div class="service-top"><span class="service-icon">${icon(service.icon)}</span><span class="service-number">0${index + 1}</span></div><h3>${t(service.title)}</h3><p>${t(service.text)}</p><a href="#contact" aria-label="${t('serviceAsk')} ${t(service.title)}">${icon('arrow')}</a></article>`).join('')}</div></div></section>

      <section id="why-trevola" class="why-section section-pad" aria-labelledby="why-title"><div class="container"><div class="section-heading" data-reveal><div><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('whyEyebrow')}</span><h2 id="why-title">${t('whyTitle')}<br><em>${t('whyAccent')}</em></h2></div><p>${t('whyDescription')}</p></div><div class="why-grid">${advantages.map((item, index) => `<article class="why-card" data-reveal style="--reveal-delay:${index * 80}ms"><span class="why-icon">${icon(item.icon)}</span><span class="why-number">0${index + 1}</span><h3>${t(item.title)}</h3><p>${t(item.text)}</p></article>`).join('')}</div></div></section>

      <section id="industries-we-serve" class="industries-home section-pad" aria-labelledby="industries-title"><div class="container"><div class="section-heading" data-reveal><div><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('industriesEyebrow')}</span><h2 id="industries-title">${t('industriesTitle')}<br><em>${t('industriesAccent')}</em></h2></div><p>${t('industriesDescription')}</p></div><div class="industries-home-grid">${industriesServed.map((item, index) => `<article class="industry-home-card" data-reveal style="--reveal-delay:${index * 65}ms"><span class="industry-home-icon">${icon(item.icon)}</span><h3>${t(item.title)}</h3><p>${t(item.text)}</p></article>`).join('')}</div></div></section>

      <section id="process" class="process-section section-pad" aria-labelledby="process-title"><div class="container"><div class="section-heading" data-reveal><div><span class="eyebrow eyebrow-light"><span class="eyebrow-line" aria-hidden="true"></span>${t('processEyebrow')}</span><h2 id="process-title">${t('processTitle')}<br><em>${t('processAccent')}</em></h2></div><p>${t('processDescription')}</p></div><ol class="process-grid">${processSteps.map((item, index) => `<li class="process-step" data-reveal style="--reveal-delay:${index * 85}ms"><span class="process-index">0${index + 1}</span><span class="process-icon">${icon(item.icon)}</span><h3>${t(item.title)}</h3><p>${t(item.text)}</p></li>`).join('')}</ol></div></section>

      <section id="network" class="network-section section-pad" aria-labelledby="network-title"><div class="container"><div class="section-heading" data-reveal><div><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('networkEyebrow')}</span><h2 id="network-title">${t('networkTitle')}<br><em>${t('networkAccent')}</em></h2></div><p>${t('networkDescription')}</p></div><div class="network-feature" data-reveal><img src="${warehouseImage}" alt="${t('networkImageAlt')}" width="2172" height="724" loading="lazy" decoding="async"><div class="network-gradient" aria-hidden="true"></div><div class="network-caption"><span>${t('networkConcept')}</span><strong>${t('networkEyebrow')}</strong></div><div class="network-badge">${icon('shield')}<span><strong>${t('networkAssurance')}</strong><small>${t('networkAssuranceText')}</small></span></div></div><div class="map-layout"><div class="map-copy" data-reveal><span class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>${t('mapEyebrow')}</span><h3>${t('mapTitle')}<br><em>${t('mapAccent')}</em></h3><p>${t('mapDescription')}</p><ul class="country-list"><li><span></span>${t('countryPortugal')}</li><li><span></span>${t('countrySpain')}</li><li><span></span>${t('countryFrance')}</li><li><span></span>${t('countryBelgium')}</li><li><span></span>${t('countryNetherlands')}</li><li><span></span>${t('countryGermany')}</li><li><span></span>${t('countryItaly')}</li></ul><p class="map-note">${icon('pin')}${t('mapCoverageNote')}</p></div><div class="map-frame" data-reveal>${mapGraphic()}</div></div></div></section>

      <section id="contact" class="contact section-pad" aria-labelledby="contact-title"><div class="container contact-grid"><div class="contact-copy" data-reveal><span class="eyebrow eyebrow-light"><span class="eyebrow-line" aria-hidden="true"></span>${t('contactEyebrow')}</span><h2 id="contact-title">${t('contactTitle')}<br><em>${t('contactAccent')}</em></h2><p>${t('contactDescription')}</p><a class="button button-primary" href="mailto:info@trevolalogistics.com?subject=${encodeURIComponent(t('requestQuote'))}">${t('heroPrimary')} ${icon('arrow')}</a></div><div class="contact-card" data-reveal><span class="contact-card-label">${t('contactCardTitle')}</span><a class="contact-detail" href="mailto:info@trevolalogistics.com"><span class="detail-icon">${icon('mail')}</span><span><small>${t('emailLabel')}</small><strong>info@trevolalogistics.com</strong></span>${icon('arrow')}</a><a class="contact-detail" href="tel:+351928338946"><span class="detail-icon">${icon('phone')}</span><span><small>${t('phoneLabel')}</small><strong>+351 928 338 946</strong></span>${icon('arrow')}</a><a class="contact-detail" href="https://www.trevolalogistics.com" target="_blank" rel="noopener noreferrer"><span class="detail-icon">${icon('globe')}</span><span><small>${t('websiteLabel')}</small><strong>www.trevolalogistics.com</strong></span>${icon('arrow')}</a><div class="contact-detail contact-static"><span class="detail-icon">${icon('shield')}</span><span><small>${t('licenceLabel')}</small><strong>Nº 901091</strong></span></div><p class="contact-location">${icon('pin')} Guarda · ${t('contactLocation')}</p></div></div></section>

      <section class="closing-cta" aria-labelledby="cta-title"><div class="container closing-inner" data-reveal><div><span class="eyebrow eyebrow-light"><span class="eyebrow-line" aria-hidden="true"></span>${t('ctaEyebrow')}</span><h2 id="cta-title">${t('ctaTitle')}</h2><p>${t('ctaDescription')}</p></div><div class="cta-actions"><a class="button button-primary" href="request-a-quote.html">${t('ctaButton')} ${icon('arrow')}</a><a class="button button-secondary" href="contact.html">${t('ctaContact')} ${icon('arrow')}</a></div></div></section>
    </main>

    <footer class="footer"><div class="container footer-main"><div class="footer-brand-block"><a class="footer-brand" href="index.html" aria-label="${t('homeLabel')}"><img src="${logo}" alt="Trevola Logistics" width="800" height="267" decoding="async"></a><p>${t('footerText')}</p></div><div class="footer-nav"><span>${t('footerExplore')}</span><a href="about-us.html">${t('navAbout')}</a><a href="services.html">${t('navServices')}</a><a href="fleet.html">${t('navNetwork')}</a><a href="industries.html">${t('navWhy')}</a><a href="contact.html">${t('navContact')}</a></div><div class="footer-contact"><span>${t('footerContact')}</span><a href="mailto:info@trevolalogistics.com">info@trevolalogistics.com</a><a href="tel:+351928338946">+351 928 338 946</a><a href="https://www.trevolalogistics.com" target="_blank" rel="noopener noreferrer">www.trevolalogistics.com</a></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Trevola Logistics. ${t('footerRights')}</span><a href="#home">${t('backTop')} ↑</a></div></footer>
    <button class="whatsapp-float" type="button" disabled aria-label="${t('whatsappLabel')}" title="${t('whatsappLabel')}">${icon('whatsapp')}</button>
    <button class="back-top" type="button" aria-label="${t('backTop')}" title="${t('backTop')}">${icon('arrow')}</button>
  `

  const routeByFile: Record<string, string> = { 'about-us.html':'about-us', 'services.html':'services', 'fleet.html':'fleet', 'industries.html':'industries', 'request-a-quote.html':'request-a-quote', 'contact.html':'contact', 'careers.html':'careers', 'news.html':'news', 'privacy-policy.html':'privacy-policy', 'cookies.html':'cookies', 'terms.html':'terms' }
  app.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    const path = link.getAttribute('href') ?? ''
    if (routeByFile[path]) link.href = pageUrl(currentLanguage, routeByFile[path] as 'about-us')
    if (path === 'index.html') link.href = pageUrl(currentLanguage, 'home')
  })
  const localizedNav = siteCopy[currentLanguage].nav
  const primaryLinks = app.querySelector<HTMLUListElement>('.nav-links')
  ;(['careers', 'news'] as const).forEach((id) => {
    const item = document.createElement('li')
    item.innerHTML = `<a href="${pageUrl(currentLanguage, id)}">${localizedNav[id]}</a>`
    primaryLinks?.append(item)
  })
  const navTools = app.querySelector<HTMLElement>('.nav-tools')
  const searchButton = document.createElement('button')
  searchButton.type = 'button'; searchButton.className = 'search-trigger'; searchButton.setAttribute('aria-label', t('searchLabel'))
  searchButton.innerHTML = `${icon('globe')}<span>${t('searchLabel')}</span>`
  navTools?.prepend(searchButton)
  const searchDialog = document.createElement('dialog')
  searchDialog.className = 'site-search-dialog'
  searchDialog.innerHTML = `<form method="dialog" class="search-dialog-inner"><button class="search-close" aria-label="${t('searchClose')}">×</button><label for="home-search">${t('searchLabel')}</label><input id="home-search" type="search" placeholder="${t('searchPlaceholder')}"><div class="search-results" aria-live="polite"></div></form>`
  document.body.append(searchDialog)
  const searchInput = searchDialog.querySelector<HTMLInputElement>('input')!
  const searchResults = searchDialog.querySelector<HTMLElement>('.search-results')!
  const searchEntries = [
    ['about-us.html', t('navAbout')], ['services.html', t('navServices')], ['fleet.html', t('navNetwork')],
    ['industries.html', t('navWhy')], ['request-a-quote.html', t('requestQuote')], ['contact.html', t('navContact')],
    ['careers.html', localizedNav.careers], ['news.html', localizedNav.news], ['privacy-policy.html', t('privacyLabel')], ['cookies.html', t('cookiesLabel')], ['terms.html', t('termsLabel')],
  ]
  const footerBottom = app.querySelector<HTMLElement>('.footer-bottom')
  if (footerBottom) {
    const legalLinks = document.createElement('nav')
    legalLinks.setAttribute('aria-label', t('footerExplore'))
    legalLinks.innerHTML = `<a href="${pageUrl(currentLanguage, 'privacy-policy')}">${t('privacyLabel')}</a><a href="${pageUrl(currentLanguage, 'cookies')}">${t('cookiesLabel')}</a><a href="${pageUrl(currentLanguage, 'terms')}">${t('termsLabel')}</a>`
    footerBottom.prepend(legalLinks)
  }
  const footerLinks = app.querySelector<HTMLElement>('.footer-nav')
  ;(['careers', 'news'] as const).forEach((id) => {
    const link = document.createElement('a')
    link.href = pageUrl(currentLanguage, id)
    link.textContent = localizedNav[id]
    footerLinks?.append(link)
  })
  searchButton.addEventListener('click', () => { searchDialog.showModal(); searchInput.focus() })
  searchDialog.addEventListener('close', () => searchButton.focus())
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLocaleLowerCase(currentLanguage)
    const matches = searchEntries.filter(([file, label]) => `${file} ${label}`.toLocaleLowerCase(currentLanguage).includes(query))
    searchResults.innerHTML = query && matches.length ? matches.map(([file, label]) => `<a href="${pageUrl(currentLanguage, routeByFile[file] as 'about-us')}"><strong>${label}</strong></a>`).join('') : query ? `<p>${t('searchEmpty')}</p>` : ''
  })

  const menuToggle = app.querySelector<HTMLButtonElement>('.menu-toggle')!
  const navPanel = app.querySelector<HTMLDivElement>('.nav-panel')!
  const languageSelect = app.querySelector<HTMLSelectElement>('.language-select')!

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', String(!isOpen))
    menuToggle.setAttribute('aria-label', isOpen ? t('menuOpen') : t('menuClose'))
    navPanel.classList.toggle('is-open', !isOpen)
  })

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false')
      menuToggle.setAttribute('aria-label', t('menuOpen'))
      navPanel.classList.remove('is-open')
    })
  })

  languageSelect.addEventListener('change', () => {
    currentLanguage = languageSelect.value as Language
    try { localStorage.setItem('trevola-language', currentLanguage) } catch { /* Continue without saved preference when storage is unavailable. */ }
    window.location.href = pageUrl(currentLanguage, 'home')
  })

  navPanel.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menuToggle.getAttribute('aria-expanded') !== 'true') return
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', t('menuOpen'))
    navPanel.classList.remove('is-open')
    menuToggle.focus()
  })

  app.querySelector<HTMLButtonElement>('.back-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  observeReveals()
}

function updateScrollControls() {
  document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 16)
  document.querySelector('.back-top')?.classList.toggle('is-visible', window.scrollY > 520)
}

render()
window.addEventListener('scroll', updateScrollControls, { passive: true })
updateScrollControls()
