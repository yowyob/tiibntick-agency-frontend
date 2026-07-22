import type { MetadataRoute } from 'next'
import { GUIDE_SECTIONS } from '@/lib/guide/nav'
import { PUBLIC_SEO_ROUTES, SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const base = PUBLIC_SEO_ROUTES.map(route => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const guidePages = GUIDE_SECTIONS
    .filter(s => !PUBLIC_SEO_ROUTES.some(r => r.path === `/guide/${s.slug}`))
    .map(s => ({
      url: `${SITE_URL}/guide/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...base, ...guidePages]
}
