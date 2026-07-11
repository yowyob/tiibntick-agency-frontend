'use client'

import { useEffect, useRef, useState } from 'react'

/** Apparition au scroll — une fois visible, reste affiché. */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  /** `left` = arrive comme un véhicule depuis la gauche */
  from?: 'up' | 'left'
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const base =
    from === 'left' ? 'landing-reveal landing-reveal-left' : 'landing-reveal'

  return (
    <Tag
      ref={ref as never}
      className={`${base} ${visible ? 'landing-reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
