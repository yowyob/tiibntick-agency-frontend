import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GuideShell from '@/components/guide/GuideShell'
import { GuideSectionBody } from '@/components/guide/GuideSectionBody'
import { GUIDE_SECTIONS, getGuideSection } from '@/lib/guide/nav'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return GUIDE_SECTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const section = getGuideSection(slug)
  if (!section) return { title: 'Guide utilisateur' }
  return buildPageMetadata({
    title: `${section.title} — Guide utilisateur`,
    description: section.description,
    path: `/guide/${section.slug}`,
    keywords: ['guide utilisateur', 'aide TiiBnTick Agency', section.title],
  })
}

export default async function GuideSectionPage({ params }: Props) {
  const { slug } = await params
  const section = getGuideSection(slug)
  if (!section) notFound()

  return (
    <GuideShell section={section}>
      <GuideSectionBody slug={section.slug} />
    </GuideShell>
  )
}
