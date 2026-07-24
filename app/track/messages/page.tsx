'use client'

import MessagingSimple from '@/components/messaging/MessagingSimple'

export default function ClientMessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg bg-white min-h-screen border-x border-gray-100 shadow-sm">
        <MessagingSimple
          audience="client"
          backHref="/track"
          backLabel="Retour au suivi"
        />
      </div>
    </div>
  )
}
