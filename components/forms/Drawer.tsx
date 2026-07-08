'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import clsx from 'clsx'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'md' | 'lg'
}

export default function Drawer({ open, onClose, title, description, children, footer, size = 'md' }: DrawerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Backdrop — covers full viewport including app header */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/30 z-[200] transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer panel — above backdrop, scrolls as a whole unit */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full bg-white z-[300] shadow-2xl border-l border-gray-200',
          'overflow-y-auto transition-transform duration-300 ease-out',
          size === 'lg' ? 'w-[640px]' : 'w-[520px]',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* min-h-full so footer sticks to bottom even with short content */}
        <div className="min-h-full flex flex-col">
          {/* Header — sticky at top, z-20 to stay above any z-10 content (timeline circles, etc.) */}
          <div className="sticky top-0 z-20 bg-white flex items-start justify-between px-6 py-5 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-1.5 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0 mt-0.5"
            >
              <X size={17} className="text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer — sticky at bottom, z-20 to match header */}
          {footer && (
            <div className="sticky bottom-0 z-20 bg-white px-6 py-4 border-t border-gray-100 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}
