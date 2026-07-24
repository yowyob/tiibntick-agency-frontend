'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { livreurAuthService } from '@/lib/services/livreurAuthService'
import MessagingSimple from '@/components/messaging/MessagingSimple'

export default function LivreurMessagesPage() {
  const router = useRouter()

  useEffect(() => {
    if (!livreurAuthService.isAuthenticated()) {
      router.replace('/livreur/login')
    }
  }, [router])

  return <MessagingSimple audience="livreur" />
}
