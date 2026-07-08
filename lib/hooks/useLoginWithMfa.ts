'use client'

import { useState, useCallback } from 'react'
import type { MfaPending } from '@/lib/services/authService'
import { isMfaRequiredError } from '@/lib/yowauthService'

export function useLoginWithMfa() {
  const [mfa, setMfa] = useState<MfaPending | null>(null)
  const [email, setEmail] = useState('')

  const captureMfa = useCallback((err: unknown, currentEmail: string) => {
    if (isMfaRequiredError(err)) {
      setEmail(currentEmail)
      setMfa(err.mfa)
      return true
    }
    return false
  }, [])

  const resetMfa = useCallback(() => setMfa(null), [])

  return { mfa, email, captureMfa, resetMfa }
}
