'use client'

import MessagingWorkspace from '@/components/messaging/MessagingWorkspace'

export default function BranchMessagesPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <MessagingWorkspace audience="branch" />
    </div>
  )
}
