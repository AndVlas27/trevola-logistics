import './style.css'
import './pages.css'
import heroImage from './assets/images/hero-production.jpg'
import aboutImage from './assets/images/trevola-loading-production.jpg'
import logo from './assets/logo/trevola-logo-production.png'
import { siteCopy, type PageId } from './page-copy'
import { currentLanguage, pageUrl } from './routes'

const icon = (name = 'arrow') => {
  const paths: Record<string,string> = {
    arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>', mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.7L7.2 10.3a16 16 0 0 0 6 6l1.8-1.8a2 2 0 0 1 1.7-.6l3.1.5a2 2 0 0 1 2.2 2.5Z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    truck:'<path d="M3 6h11v12H3zM14 10h4l3 3v5h-7z"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/>',
    boxes:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    whatsapp:'<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"/>',
  }
  return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (paths[name] || paths.arrow) + '</svg>'
}

const languages = ['en','pt','fr','de'] as const
const locale = currentLanguage()
const copy = siteCopy[locale]
const common = copy.common
const transportOptions: Record<string, [string, string][]> = {
  en: [['FTL', 'FTL'], ['LTL', 'LTL'], ['Express', 'Express'], ['Dedicated', 'Dedicated']],
  pt: [['FTL', 'FTL'], ['LTL', 'LTL'], ['Express', 'Expresso'], ['Dedicated', 'Dedicado']],
  fr: [['FTL', 'FTL'], ['LTL', 'LTL'], ['Express', 'Express'], ['Dedicated', 'Dédié']],
  de: [['FTL', 'FTL'], ['LTL', 'LTL'], ['Express', 'Express'], ['Dedicated', 'Direkttransport']],
}
const page = (document.body.dataset.page || 'about-us') as PageId
const href = (id: PageId) => pageUrl(locale,id)
const imageText = {
  en: ['Trevola Logistics road transport, illustrative image', 'Illustrative transport image'],
  pt: ['Transporte rodoviário Trevola Logistics, imagem ilustrativa', 'Imagem ilustrativa de transporte'],
  fr: ['Transport routier Trevola Logistics, image illustrative', 'Image illustrative de transport'],
  de: ['Straßentransport von Trevola Logistics, Beispielbild', 'Illustratives Transportbild'],
}[locale]
const labels: Record<string,string> = {
  'about-us':'about-us', services:'services', fleet:'fleet', industries:'industries', contact:'contact',
  careers:'careers', news:'news', 'request-a-quote':'quote', 'privacy-policy':'privacy', cookies:'cookies', terms:'terms',
}

function header() {
  const navIds: PageId[] = ['about-us','services','fleet','industries','contact','careers','news']
  return '<a class="skip-link" href="#page-main">' + common.skip + '</a><div class="utility-bar"><div class="container utility-inner"><a href="mailto:info@trevolalogistics.com">' + icon('mail') + '<span>info@trevolalogistics.com</span></a><span class="utility-divider"></span><a href="tel:+351928338946">' + icon('phone') + '<span>+351 928 338 946</span></a></div></div>' +
  '<header class="site-header"><nav class="navbar container" aria-label="' + copy.nav.home + '"><a class="brand" href="' + href('home') + '" aria-label="' + common.home + '"><img src="' + logo + '" alt="Trevola Logistics" width="800" height="267"></a><button class="menu-toggle" type="button" aria-label="' + common.menuOpen + '" aria-expanded="false" aria-controls="page-navigation"><span></span><span></span><span></span></button><div class="nav-panel" id="page-navigation"><ul class="nav-links"><li><a href="' + href('home') + '">' + copy.nav.home + '</a></li>' +
  navIds.map((id) => '<li><a href="' + href(id) + '"' + (page===id?' aria-current="page"':'') + '>' + copy.nav[labels[id]] + '</a></li>').join('') +
  '</ul><div class="nav-tools"><button type="button" class="search-trigger" aria-label="' + copy.nav.search + '">' + icon('globe') + '<span>' + copy.nav.search + '</span></button><label class="language-control">' + icon('globe') + '<span class="sr-only">' + copy.nav.language + '</span><select class="language-select" aria-label="' + copy.nav.language + '">' +
  languages.map(code => '<option value="' + code + '"' + (code===locale?' selected':'') + '>' + siteCopy[code].label + '</option>').join('') +
  '</select></label><a class="nav-cta" href="' + href('request-a-quote') + '">' + copy.nav.quote + ' ' + icon() + '</a></div></div></nav></header>'
}

function quote() {
  const fields: [string,string][] = [['company','text'],['contact','text'],['email','email'],['phone','tel'],['pickupCountry','text'],['pickupCity','text'],['deliveryCountry','text'],['deliveryCity','text'],['transport','select'],['pallets','number'],['cargo','textarea'],['weight','number'],['volume','number'],['loadingDate','date'],['additional','textarea']]
  const controls = fields.map(([name,type]) => {
    const label = copy.quote.labels[name]
    const id = name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())
    let input = type==='select'
      ? '<select id="field-' + name + '" name="' + name + '" required aria-describedby="' + id + '-error"><option value="">' + copy.quote.select + '</option>' + transportOptions[locale].map(([value, label]) => '<option value="' + value + '">' + label + '</option>').join('') + '</select>'
      : type==='textarea'
        ? '<textarea id="field-' + name + '" name="' + name + '" rows="3" required aria-describedby="' + id + '-error"></textarea>'
        : '<input id="field-' + name + '" name="' + name + '" type="' + type + '" required aria-describedby="' + id + '-error"' + (type==='number'?(name==='pallets'?' min="1" step="1" inputmode="numeric"':' min="0.01" step="0.01" inputmode="decimal"'):'') + '>'
    return '<label for="field-' + name + '"' + (name==='cargo'||name==='additional'?' class="form-full"':'') + '>' + label + ' <span aria-hidden="true">*</span>' + input + '<small class="field-error" id="' + id + '-error"></small></label>'
  }).join('')
  return '<section class="quote-section section-pad"><div class="container quote-layout"><div class="quote-copy"><span class="eyebrow">' + copy.nav.quote + '</span><h2>' + copy.quote.fieldsTitle + '</h2><p class="detail-lead">' + copy.quote.intro + '</p><div class="quote-map-card"><div class="quote-map-heading"><span>' + copy.nav.fleet + '</span><strong>' + common.portugal + ' → ' + common.europe + '</strong></div><svg class="quote-map" viewBox="0 0 360 210" role="img" aria-label="' + common.mapNote + '"><path class="quote-map-land" d="m41 117 10-20-1-23 17-20 25-6 12-23 22-8 22 10 23-11 22 14 20-6 24 14 25-4 16 15 24 4 12 21 22 8 11 21-13 16-19 4-14 21-27 2-13 20-19 6-3 25-18 4-12-19-19-1-9-20-16-5-8-28-19-8-9-26-20-5-6 24-16 16-14-6 3-23-12-9-14 9-13-7-11 13-20-6-16 10-15-2-13-10Z"/><path class="quote-map-route" d="M48 154C93 140 110 124 142 112S195 100 218 84s52-26 91-44"/></svg><p>' + common.mapNote + '</p></div><aside class="quote-contact-card"><h3>Trevola Logistics</h3><a href="mailto:info@trevolalogistics.com"><small>' + common.email + '</small><strong>info@trevolalogistics.com</strong></a><a href="tel:+351928338946"><small>' + common.phone + '</small><strong>+351 928 338 946</strong></a><a href="https://www.trevolalogistics.com" target="_blank" rel="noopener noreferrer"><small>' + common.website + '</small><strong>www.trevolalogistics.com</strong></a><div><small>' + common.license + '</small><strong>' + common.licenseNumber + '</strong></div></aside></div><form class="quote-form" id="quote-form" novalidate><div class="quote-form-heading"><span class="eyebrow">' + copy.quote.fieldsTitle + '</span><h2>' + copy.quote.fieldsTitle + '</h2><p>' + copy.quote.requiredNote + '</p></div><div class="form-grid">' + controls + '<label class="honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="quote-form-status" id="quote-status" role="status" aria-live="polite" tabindex="-1" hidden></div><button class="button button-primary quote-submit" type="submit"><span class="submit-label">' + copy.nav.quote + '</span><span class="submit-loading" aria-hidden="true">' + copy.quote.loading + '</span>' + icon() + '</button><p class="form-note">' + copy.legal['privacy-policy'].sections[1].text + ' <a href="' + href('privacy-policy') + '">' + copy.nav.privacy + '</a></p></form></div></section>'
}

function mainContent() {
  if (page==='request-a-quote') return quote()
  if (page==='privacy-policy'||page==='cookies'||page==='terms') {
    const legal=copy.legal[page]
    return '<section class="detail-values section-pad"><div class="container legal-content"><div class="page-section-heading"><h2>' + legal.title + '</h2></div>' + legal.sections.map(section=>'<article><h3>' + section.title + '</h3><p>' + section.text + '</p></article>').join('') + '<p class="industry-note">' + legal.note + '</p></div></section>'
  }
  if (page==='careers') return '<section class="detail-values section-pad"><div class="container empty-state"><h2>' + copy.careers.emptyTitle + '</h2><p>' + copy.careers.emptyText + '</p><a class="button button-primary" href="mailto:info@trevolalogistics.com">' + copy.careers.button + '</a></div></section>'
  if (page==='news') return '<section class="detail-values section-pad"><div class="container empty-state"><h2>' + copy.news.emptyTitle + '</h2><p>' + copy.news.emptyText + '</p></div></section>'
  const data=copy.pages[page]
  if (!data) return '<section class="detail-values section-pad"><div class="container empty-state"><h2>' + copy.seo[page][0] + '</h2><p>' + copy.seo[page][1] + '</p></div></section>'
  const h=data.heading || [data.hero[0],data.hero[1],data.hero[2]]
  const paragraphs=data.paragraphs || []
  const image=(page==='about-us'||page==='industries'||page==='contact')?aboutImage:heroImage
  const intro='<section class="detail-intro section-pad"><div class="container detail-two-col"><div><span class="eyebrow">' + data.hero[0] + '</span><h2>' + h[1] + ' <em>' + h[2] + '</em></h2><p class="detail-lead">' + (paragraphs[0]||data.hero[3]) + '</p>' + paragraphs.slice(1).map(text=>'<p>' + text + '</p>').join('') + '<a class="text-link" href="' + href('request-a-quote') + '">' + common.discuss + ' ' + icon() + '</a></div><figure class="detail-photo"><img src="' + image + '" alt="' + imageText[0] + '" width="1536" height="1024" loading="lazy" decoding="async"><figcaption>Trevola Logistics · ' + imageText[1] + '</figcaption></figure></div></section>'
  const cards=data.cards?.length ? '<section class="detail-values section-pad"><div class="container"><div class="page-section-heading"><h2>' + h[1] + ' <em>' + h[2] + '</em></h2></div><div class="detail-cards ' + (page==='industries'?'industry-grid':'service-page-grid') + '">' + data.cards.map((item,i)=>'<article><span class="card-index">0' + (i+1) + '</span><h3>' + item.title + '</h3><p>' + item.text + '</p></article>').join('') + '</div>' + (data.note?'<p class="industry-note">' + data.note + '</p>':'') + '</div></section>' : ''
  return intro+cards
}

function footer() {
  const links: PageId[]=['about-us','services','fleet','industries','request-a-quote','careers','news']
  return '<section class="detail-cta"><div class="container detail-cta-inner"><div><span class="eyebrow eyebrow-light">' + copy.cta.eyebrow + '</span><h2>' + copy.cta.title + '</h2><p>' + copy.cta.text + '</p></div><div class="cta-actions"><a class="button button-primary" href="' + href('request-a-quote') + '">' + copy.cta.quote + ' ' + icon() + '</a><a class="button button-secondary" href="' + href('contact') + '">' + copy.cta.contact + '</a></div></div></section><footer class="footer"><div class="container footer-main"><div class="footer-brand-block"><a class="footer-brand" href="' + href('home') + '"><img src="' + logo + '" alt="Trevola Logistics" width="800" height="267" loading="lazy"></a><p>' + common.footerText + '</p></div><div class="footer-nav"><span>' + common.explore + '</span>' + links.map(id=>'<a href="' + href(id) + '">' + copy.nav[labels[id]] + '</a>').join('') + '</div><div class="footer-contact"><span>' + common.contact + '</span><a href="mailto:info@trevolalogistics.com">info@trevolalogistics.com</a><a href="tel:+351928338946">+351 928 338 946</a><span class="footer-licence">' + common.license + ' ' + common.licenseNumber + '</span></div></div><div class="container footer-bottom"><span>© ' + new Date().getFullYear() + ' Trevola Logistics. ' + common.rights + '</span><a href="' + href('privacy-policy') + '">' + copy.nav.privacy + '</a><a href="' + href('cookies') + '">' + copy.nav.cookies + '</a><a href="' + href('terms') + '">' + copy.nav.terms + '</a><a href="#page-main">' + common.backTop + ' ↑</a></div></footer><a class="whatsapp-float" href="https://wa.me/351962336946" target="_blank" rel="noopener noreferrer" aria-label="' + common.whatsappLabel + '" title="' + common.whatsappLabel + '">' + icon('whatsapp') + '</a><button class="back-top" type="button" aria-label="' + common.backTop + '">' + icon() + '</button>'
}

function setupSearch(app: HTMLElement) {
  const trigger=app.querySelector<HTMLButtonElement>('.search-trigger')
  if (!trigger) return
  const dialog=document.createElement('dialog')
  dialog.className='site-search-dialog'
  dialog.innerHTML='<form method="dialog" class="search-dialog-inner"><button class="search-close" aria-label="' + copy.common.searchClose + '">×</button><label for="site-search-input">' + copy.common.searchLabel + '</label><input id="site-search-input" type="search" placeholder="' + copy.common.searchPlaceholder + '"><div class="search-results" aria-live="polite"></div></form>'
  document.body.append(dialog)
  const input=dialog.querySelector<HTMLInputElement>('input')!
  const results=dialog.querySelector<HTMLDivElement>('.search-results')!
  const entries=(Object.keys(copy.seo) as PageId[]).map(id=>({id,title:id==='home'?copy.nav.home:copy.nav[labels[id]]||copy.seo[id][0],text:copy.seo[id][1]}))
  trigger.addEventListener('click',()=>{dialog.showModal();input.focus()})
  dialog.addEventListener('close',()=>trigger.focus())
  input.addEventListener('input',()=>{const q=input.value.toLocaleLowerCase(locale).trim();const matches=entries.filter(x=>(x.title+' '+x.text).toLocaleLowerCase(locale).includes(q));results.innerHTML=q&&matches.length?matches.map(x=>'<a href="' + href(x.id) + '"><strong>' + x.title + '</strong><small>' + x.text + '</small></a>').join(''):q?'<p>' + common.searchEmpty + '</p>':''})
}

function setupForm(app: HTMLElement) {
  const form=app.querySelector<HTMLFormElement>('#quote-form')
  if (!form) return
  const fields=[...form.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('input:not([name="website"]),select,textarea')]
  form.addEventListener('submit',async event=>{
    event.preventDefault()
    let invalid: HTMLElement|undefined
    fields.forEach(field=>{
      const past=field instanceof HTMLInputElement&&field.type==='date'&&field.value<new Date().toISOString().slice(0,10)
      const message=field.validity.valueMissing?copy.quote.errors.required:field instanceof HTMLInputElement&&field.type==='email'&&field.validity.typeMismatch?copy.quote.errors.email:field instanceof HTMLInputElement&&field.type==='number'&&field.validity.rangeUnderflow?copy.quote.errors.minimum:past?copy.quote.errors.date:''
      field.setAttribute('aria-invalid',String(Boolean(message)))
      const target=form.querySelector<HTMLElement>('#'+field.getAttribute('aria-describedby'))
      if(target)target.textContent=message
      if(message&&!invalid)invalid=field
    })
    const status=form.querySelector<HTMLElement>('#quote-status')!
    if(invalid){invalid.focus();return}
    const button=form.querySelector<HTMLButtonElement>('.quote-submit')!
    button.disabled=true;button.setAttribute('aria-busy','true');form.classList.add('is-submitting')
    try{
      const response=await fetch('/api/request-quote',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))})
      const result=await response.json().catch(()=>({})) as {error?:string}
      status.textContent=response.ok?copy.quote.success:result.error==='email_not_configured'?copy.quote.notConfigured:copy.quote.genericError
      status.toggleAttribute('data-state',!response.ok)
      if(response.ok)form.reset()
    } catch {status.textContent=copy.quote.genericError;status.setAttribute('data-state','error')}
    finally{form.classList.remove('is-submitting');button.disabled=false;button.removeAttribute('aria-busy');status.hidden=false;status.focus()}
  })
}

function render() {
  const app=document.querySelector<HTMLDivElement>('#page-app')
  if(!app)return
  const [title,description]=copy.seo[page]
  document.documentElement.lang=locale==='pt'?'pt-PT':locale
  document.title=title
  document.querySelector('meta[name="description"]')?.setAttribute('content',description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description)
  const data=copy.pages[page]
  const hero=page==='privacy-policy'||page==='cookies'||page==='terms'?[copy.nav[labels[page]],copy.legal[page].title,'',copy.legal[page].note]:page==='careers'?[copy.nav.careers,copy.careers.emptyTitle,'',copy.careers.emptyText]:page==='news'?[copy.nav.news,copy.news.emptyTitle,'',copy.news.emptyText]:page==='request-a-quote'?[copy.nav.quote,copy.quote.fieldsTitle,'',copy.quote.intro]:data?.hero ?? copy.seo[page]
  const image=page==='about-us'||page==='industries'||page==='contact'?aboutImage:heroImage
  app.innerHTML=header()+'<main id="page-main" class="detail-page"><section class="page-hero" style="--page-image:url(\''+image+'\')" aria-labelledby="page-title"><div class="page-hero-shade"></div><div class="container page-hero-inner"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="'+href('home')+'">'+copy.nav.home+'</a><span aria-hidden="true">/</span><span aria-current="page">'+hero[0]+'</span></nav><span class="page-hero-eyebrow"><i></i>'+hero[0]+'</span><h1 id="page-title">'+hero[1]+(hero[2]?'<br><em>'+hero[2]+'</em>':'')+'</h1><p>'+hero[3]+'</p>'+(page==='privacy-policy'||page==='cookies'||page==='terms'||page==='careers'||page==='news'?'':'<a class="button button-primary" href="'+href('request-a-quote')+'">'+copy.nav.quote+' '+icon()+'</a>')+'</div></section>'+mainContent()+footer()+'</main>'
  const menu=app.querySelector<HTMLButtonElement>('.menu-toggle')!,panel=app.querySelector<HTMLElement>('.nav-panel')!
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?common.menuOpen:common.menuClose);panel.classList.toggle('is-open',!open)})
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');panel.classList.remove('is-open');menu.focus()}})
  app.querySelector<HTMLSelectElement>('.language-select')?.addEventListener('change',event=>{const lang=(event.currentTarget as HTMLSelectElement).value;try{localStorage.setItem('trevola-language',lang)}catch{}location.href=pageUrl(lang as typeof locale,page)})
  app.querySelector<HTMLButtonElement>('.back-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))
  setupSearch(app);setupForm(app)
  const reveal=app.querySelectorAll<HTMLElement>('.detail-page > section,.detail-photo,.detail-cards article')
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))reveal.forEach(item=>item.classList.add('is-visible'))
  else{const observer=new IntersectionObserver((entries,instance)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');instance.unobserve(entry.target)}}),{threshold:.12});reveal.forEach(item=>{item.setAttribute('data-reveal','');observer.observe(item)})}
  const update=()=>{document.querySelector('.site-header')?.classList.toggle('is-scrolled',scrollY>16);app.querySelector('.back-top')?.classList.toggle('is-visible',scrollY>520)}
  window.addEventListener('scroll',update,{passive:true});update()
}
render()

