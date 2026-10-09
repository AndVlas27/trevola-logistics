import type { Language } from './i18n'
import type { PageId } from './page-copy'

export const languages: Language[] = ['en', 'pt', 'fr', 'de', 'ru', 'uk']

export function pageUrl(language: Language, page: PageId): string {
  const filename = page === 'home' ? '' : page + '.html'
  return `/${language}/${filename}`
}

export function currentLanguage(): Language {
  const bodyLocale = document.body.dataset.locale
  const pathLocale = location.pathname.split('/').filter(Boolean)[0]
  let saved: string | null = null
  try { saved = localStorage.getItem('trevola-language') } catch { /* Storage can be unavailable in private browsing. */ }
  const candidate = bodyLocale || (languages.includes(pathLocale as Language) ? pathLocale : saved) || pathLocale
  if (languages.includes(candidate as Language)) return candidate as Language
  return 'pt'
}
