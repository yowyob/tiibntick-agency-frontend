'use client'

import { useState, useRef } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import Avatar from './Avatar'
import { mediaService } from '@/lib/services/mediaService'

const CAMERA_SIZE: Record<string, number> = { xs: 9, sm: 11, md: 14, lg: 18 }

interface Props {
  name: string
  photoUrl?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  onUpload?: (url: string) => void
}

export default function UploadableAvatar({ name, photoUrl, size = 'sm', className, onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
    if (onUpload) {
      setUploading(true)
      try {
        const url = await mediaService.uploadFile(f, 'avatar')
        onUpload(url)
      } finally {
        setUploading(false)
      }
    }
  }

  return (
    <div className="relative group flex-shrink-0">
      <Avatar name={name} photoUrl={preview ?? photoUrl} size={size} className={className} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
      >
        {uploading
          ? <Loader2 size={CAMERA_SIZE[size]} className="text-white animate-spin" />
          : <Camera size={CAMERA_SIZE[size]} className="text-white" />
        }
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
