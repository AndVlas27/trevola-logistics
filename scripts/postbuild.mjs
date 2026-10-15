import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = new URL('../dist/', import.meta.url)
const out = decodeURIComponent(root.pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const builtAssets = await readdir(join(out, 'assets'))
const heroAssetByPage = {
  home: 'hero-production-',
  'about-us': 'trevola-loading-production-',
  services: 'services-wall-logo-premium-',
  trucks: 'trevola-truck-loading-',
  vans: 'trevola-express-van-',
  minitrucks: 'trevola-minitruck-',
  fleet: 'trevola-fleet-lineup-premium-',
  industries: 'industries-cargo-production-',
  'request-a-quote': 'contact-coordinator-mural-',
  contact: 'contact-communications-hero-',
  careers: 'careers-team-hero-',
  news: 'news-logistics-editorial-',
}
const pageHeroAssets = Object.fromEntries(Object.entries(heroAssetByPage).map(([page, prefix]) => [
  page,
  builtAssets.find(file => file.startsWith(prefix) && /\.(avif|webp|jpe?g|png)$/i.test(file)),
]))
const base = 'https://www.trevolalogistics.com'
const langs = ['en', 'pt', 'fr', 'de', 'ru', 'uk']
const pages = ['home', 'about-us', 'services', 'trucks', 'vans', 'minitrucks', 'fleet', 'industries', 'request-a-quote', 'contact', 'privacy-policy', 'cookies', 'terms', 'careers', 'news']
const nav = {
  en: { home:'Home', 'about-us':'About Us', services:'Services', trucks:'Trucks', vans:'Express Vans', minitrucks:'Minitrucks', fleet:'Fleet', industries:'Industries', 'request-a-quote':'Request a Quote', contact:'Contact', 'privacy-policy':'Privacy Policy', cookies:'Cookie Policy', terms:'Terms & Conditions', careers:'Careers', news:'News' },
  pt: { home:'Início', 'about-us':'Sobre nós', services:'Serviços', trucks:'Camiões', vans:'Carrinhas expresso', minitrucks:'Minitir', fleet:'Rede de transporte', industries:'Setores', 'request-a-quote':'Pedir orçamento', contact:'Contactos', 'privacy-policy':'Política de Privacidade', cookies:'Política de Cookies', terms:'Termos e Condições', careers:'Carreiras', news:'Notícias' },
  fr: { home:'Accueil', 'about-us':'À propos', services:'Services', trucks:'Camions', vans:'Utilitaires express', minitrucks:'Minitrucks', fleet:'Réseau', industries:'Secteurs', 'request-a-quote':'Demander un devis', contact:'Contact', 'privacy-policy':'Confidentialité', cookies:'Politique de cookies', terms:'Conditions générales', careers:'Carrières', news:'Actualités' },
  de: { home:'Startseite', 'about-us':'Über uns', services:'Leistungen', trucks:'Lkw', vans:'Express-Transporter', minitrucks:'Minitrucks', fleet:'Netzwerk', industries:'Branchen', 'request-a-quote':'Angebot anfragen', contact:'Kontakt', 'privacy-policy':'Datenschutz', cookies:'Cookie-Richtlinie', terms:'AGB', careers:'Karriere', news:'Neuigkeiten' },
  ru: { home:'Главная', 'about-us':'О компании', services:'Услуги', trucks:'Грузовые автомобили', vans:'Экспресс-фургоны', minitrucks:'Малотоннажные автомобили', fleet:'Сеть перевозок', industries:'Отрасли', 'request-a-quote':'Запросить расчёт', contact:'Контакты', 'privacy-policy':'Политика конфиденциальности', cookies:'Файлы cookie', terms:'Условия использования', careers:'Карьера', news:'Новости' },
  uk: { home:'Головна', 'about-us':'Про компанію', services:'Послуги', trucks:'Вантажівки', vans:'Експрес-фургони', minitrucks:'Малотоннажні автомобілі', fleet:'Мережа перевезень', industries:'Галузі', 'request-a-quote':'Запросити розрахунок', contact:'Контакти', 'privacy-policy':'Політика конфіденційності', cookies:'Файли cookie', terms:'Умови використання', careers:'Кар’єра', news:'Новини' },
}
const descriptions = {
  en:'International road freight coordination between Portugal and Europe. Contact Trevola Logistics about routes, cargo and transport services.',
  pt:'Coordenação de transporte rodoviário internacional entre Portugal e a Europa. Contacte a Trevola Logistics sobre cargas e serviços.',
  fr:'Coordination du transport routier international entre le Portugal et l’Europe. Contactez Trevola Logistics pour vos expéditions.',
  de:'Koordination internationaler Straßentransporte zwischen Portugal und Europa. Kontaktieren Sie Trevola Logistics zu Fracht und Transport.',
  ru:'Координация международных автомобильных перевозок из Португалии в Европу. Свяжитесь с Trevola Logistics по вопросам груза и маршрута.',
  uk:'Координація міжнародних автомобільних перевезень із Португалії до Європи. Зверніться до Trevola Logistics щодо вантажу й маршруту.',
}
const sourceCopy = await readFile(new URL('../src/page-copy.ts', import.meta.url), 'utf8')
const seoMeta = Object.fromEntries(langs.map(lang => {
  const localeStart = sourceCopy.indexOf('  ' + lang + ': {')
  const seoStart = sourceCopy.indexOf('    seo: {', localeStart)
  const seoEnd = sourceCopy.indexOf('\n    },', seoStart)
  const block = sourceCopy.slice(seoStart, seoEnd)
  const entries = Object.fromEntries([...block.matchAll(/^\s*'?([\w-]+)'?: \['((?:\\.|[^'])*)', '((?:\\.|[^'])*)'\],?$/gm)].map(match => [match[1], [match[2].replaceAll("\\'", "'"), match[3].replaceAll("\\'", "'")]]))
  return [lang, entries]
}))
const vehicleDescriptions = {
  en: { trucks:'Curtainsider and refrigerated transport for general cargo, with express team driving, GPS monitoring and ADR coordination where suitable.', vans:'Direct express van transport for urgent shipments that fit the available vehicle, route and delivery window.', minitrucks:'Intermediate transport capacity for general and palletised goods, with express options subject to route and availability.' },
  pt: { trucks:'Transporte de carga geral em camião de lona ou frigorífico, com opção expresso com dois motoristas, GPS e ADR quando adequado.', vans:'Transporte expresso direto em carrinha para cargas compatíveis com o veículo, percurso e prazo disponível.', minitrucks:'Capacidade intermédia para carga geral e paletizada, com opção expresso conforme percurso e disponibilidade.' },
  fr: { trucks:'Transport de marchandises générales en camion bâché ou frigorifique, avec express à deux conducteurs, GPS et ADR si adapté.', vans:'Transport express direct en utilitaire pour les marchandises adaptées au véhicule, à l’itinéraire et au délai.', minitrucks:'Capacité intermédiaire pour marchandises générales et palettisées, avec option express selon le trajet et la disponibilité.' },
  de: { trucks:'Allgemeine Güter im Planen- oder Kühlfahrzeug, mit Express-Zweifahrerbetrieb, GPS und ADR nach Eignung.', vans:'Direkter Express-Transporter für dringende Sendungen passend zu Fahrzeug, Route und Zeitfenster.', minitrucks:'Mittlere Kapazität für allgemeine und palettierte Güter, Express je nach Route und Verfügbarkeit.' },
  ru: { trucks:'Перевозка обычных грузов тентованным или рефрижераторным автомобилем; экспресс с двумя водителями, GPS и ADR при наличии условий.', vans:'Прямая экспресс-доставка фургоном для грузов, подходящих по маршруту, вместимости и срокам.', minitrucks:'Промежуточная вместимость для обычных и палетированных грузов, экспресс зависит от маршрута и наличия.' },
  uk: { trucks:'Перевезення звичайних вантажів тентованим або рефрижераторним автомобілем; експрес із двома водіями, GPS та ADR за відповідних умов.', vans:'Пряма експрес-доставка фургоном для вантажів, що відповідають маршруту, місткості й строкам.', minitrucks:'Проміжна місткість для звичайних і палетованих вантажів; експрес залежить від маршруту та наявності.' },
}
const localeTag = { en:'en', pt:'pt-PT', fr:'fr', de:'de', ru:'ru', uk:'uk-UA' }
const pathFor = (lang, page) => '/' + lang + '/' + (page === 'home' ? '' : page + '.html')
const sourceFor = page => join(out, page === 'home' ? 'index.html' : page + '.html')
function escape(value) { return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;') }
function setBodyLocale(html, lang) {
  return html.replace(/<body([^>]*)>/, (_, attributes) => {
    const withoutLocale = attributes.replace(/\sdata-locale="[^"]*"/, '')
    return '<body' + withoutLocale + ' data-locale="' + lang + '">'
  })
}

for (const page of pages) {
  const template = await readFile(sourceFor(page), 'utf8')
  for (const lang of langs) {
    const target = join(out, lang, page === 'home' ? 'index.html' : page + '.html')
    await mkdir(dirname(target), { recursive: true })
    await copyFile(sourceFor(page), target)
    let html = template
    const title = seoMeta[lang][page]?.[0] || (page === 'home' ? 'Trevola Logistics | ' + nav[lang].home : nav[lang][page] + ' | Trevola Logistics')
    const pageDescription = seoMeta[lang][page]?.[1] || vehicleDescriptions[lang]?.[page] || descriptions[lang]
    const canonical = base + pathFor(lang, page)
    const alternates = langs.map(code => '<link rel="alternate" hreflang="' + localeTag[code] + '" href="' + base + pathFor(code,page) + '">').join('\n  ')
      + '\n  <link rel="alternate" hreflang="x-default" href="' + base + pathFor('en',page) + '">'
    html = html.replace(/<html lang="[^"]*">/, '<html lang="' + localeTag[lang] + '">')
    html = setBodyLocale(html, lang)
    html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + escape(title) + '</title>')
      .replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="' + escape(pageDescription) + '">')
      .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="' + canonical + '">')
      .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="' + canonical + '">')
      .replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, '<meta property="og:locale" content="' + ({en:'en_US',pt:'pt_PT',fr:'fr_FR',de:'de_DE',ru:'ru_RU',uk:'uk_UA'}[lang]) + '">')
      .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, '<meta property="og:title" content="' + escape(title) + '">')
      .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, '<meta property="og:description" content="' + escape(pageDescription) + '">')
      .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, '<meta name="twitter:title" content="' + escape(title) + '">')
      .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, '<meta name="twitter:description" content="' + escape(pageDescription) + '">')
    if (!html.includes('rel="preload" as="image"')) {
      const image = pageHeroAssets[page]
      if (image) html = html.replace('</head>', '  <link rel="preload" as="image" href="/assets/' + image + '" fetchpriority="high">\n</head>')
    }
    if (!html.includes('rel="manifest"')) html = html.replace('</head>', '  <link rel="manifest" href="/manifest.webmanifest">\n</head>')
    html = html.replace('</head>', '  <meta name="color-scheme" content="light">\n</head>')
    html = html.replace('</head>', '  ' + alternates + '\n</head>')
    await writeFile(target, html)
  }
  // Keep the legacy root URLs usable while identifying them as English aliases (Portuguese for home).
  const alias = sourceFor(page)
  let rootHtml = template
  const aliasLang = page === 'home' ? 'pt' : 'en'
  const canonical = base + pathFor(aliasLang,page)
  rootHtml = setBodyLocale(rootHtml, aliasLang)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="' + canonical + '">')
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="' + canonical + '">')
    .replace('</head>', '  ' + langs.map(code=>'<link rel="alternate" hreflang="' + localeTag[code] + '" href="' + base + pathFor(code,page) + '">').join('\n  ') + '\n  <link rel="alternate" hreflang="x-default" href="' + base + pathFor('en',page) + '">\n</head>')
  if (!rootHtml.includes('rel="manifest"')) rootHtml = rootHtml.replace('</head>', '  <link rel="manifest" href="/manifest.webmanifest">\n</head>')
  await writeFile(alias,rootHtml)
}

const priorities = { home:'1.0', 'request-a-quote':'0.9', services:'0.8', contact:'0.8', industries:'0.7', 'about-us':'0.7', fleet:'0.6' }
const urls = pages.flatMap(page=>langs.map(lang=>{
  const alternates = langs.map(code=>'<xhtml:link rel="alternate" hreflang="' + localeTag[code] + '" href="' + base + pathFor(code,page) + '"/>').join('')
  return '<url><loc>' + base + pathFor(lang,page) + '</loc>' + alternates + '<changefreq>monthly</changefreq><priority>' + (priorities[page] || '0.4') + '</priority></url>'
})).join('\n')
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + urls + '\n</urlset>\n'
await writeFile(join(out,'sitemap.xml'),sitemap)
await writeFile(new URL('../public/sitemap.xml', import.meta.url),sitemap)
await writeFile(join(out,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: ' + base + '/sitemap.xml\n')
