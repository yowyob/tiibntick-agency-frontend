'use client'

import MessagingWorkspace from '@/components/messaging/MessagingWorkspace'

export default function AgencyMessagesPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <MessagingWorkspace audience="agency-admin" />
    </div>
  )
}
