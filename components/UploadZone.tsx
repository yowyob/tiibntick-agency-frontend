'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, X, Loader2 } from 'lucide-react'
import { mediaService } from '@/lib/services/mediaService'

interface Props {
  label: string
  hint?: string
  accept?: string
  category?: string
  onUpload?: (url: string) => void
}

export default function UploadZone({ label, hint, accept = 'image/*,.pdf', category = 'general', onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const apply = async (f: File) => {
    setFile(f)
    if (f.type.startsWith('image/')) {
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(f))
    } else {
      setPreview(null)
    }
    if (onUpload) {
      setUploading(true)
      try {
        const url = await mediaService.uploadFile(f, category)
        onUpload(url)
      } finally {
        setUploading(false)
      }
    }
  }

  const remove = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <input ref={inputRef} type="file" accept={accept} className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) apply(f) }} />
      {file ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white">
          {preview ? (
            <img src={preview} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} Ko · {file.type.includes('pdf') ? 'PDF' : 'Image'}</p>
          </div>
          {uploading ? (
            <Loader2 size={14} className="text-orange-500 animate-spin flex-shrink-0" />
          ) : (
            <button type="button" onClick={remove}
              className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) apply(f) }}
          onDragOver={e => e.preventDefault()}
          className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/30 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Upload size={16} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Glisser ou <span className="text-orange-500 font-medium">choisir un fichier</span>
            </p>
            {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
          </div>
        </button>
      )}
    </div>
  )
}
