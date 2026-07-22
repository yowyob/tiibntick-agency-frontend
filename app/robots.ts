import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/guide',
          '/guide/',
          '/track',
          '/track/deposit',
          '/login',
          '/register',
          '/livreur/login',
          '/branch/login',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard',
          '/missions',
          '/fleet',
          '/staff',
          '/hubs',
          '/billing',
          '/settings',
          '/profile',
          '/branches',
          '/accueil',
          '/litiges',
          '/pending',
          '/livreur/',
          '/branch/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
