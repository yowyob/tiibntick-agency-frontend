'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface AvatarProps {
  name: string
  photoUrl?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  xs: { box: 'w-6 h-6',  text: 'text-[9px]'  },
  sm: { box: 'w-8 h-8',  text: 'text-xs'      },
  md: { box: 'w-10 h-10', text: 'text-sm'     },
  lg: { box: 'w-16 h-16', text: 'text-xl'     },
}

export default function Avatar({ name, photoUrl, size = 'sm', className }: AvatarProps) {
  const [error, setError] = useState(false)
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const s = SIZES[size]

  if (photoUrl && !error) {
    return (
      <div className={clsx('rounded-full overflow-hidden flex-shrink-0', s.box, className)}>
        <img
          src={photoUrl}
          alt={name}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className={clsx('rounded-full flex items-center justify-center flex-shrink-0 bg-orange-100', s.box, className)}>
      <span className={clsx('font-semibold text-orange-700', s.text)}>{initials}</span>
    </div>
  )
}
