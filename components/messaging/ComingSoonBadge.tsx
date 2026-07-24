import { Clock } from 'lucide-react'

export default function ComingSoonBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      <Clock size={12} className="shrink-0" />
      Bientôt disponible
    </span>
  )
}
