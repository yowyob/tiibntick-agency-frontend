'use client'

import { useState } from 'react'
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { getUserEmail } from '@/lib/session'
import { fleetManService } from '@/lib/services/fleetManService'
import { formatUserError } from '@/lib/errors'

function openFleetMan(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function FleetManConnectButton({ onSynced }: { onSynced?: () => void }) {
  const [linked, setLinked] = useState<boolean | null>(null)
  const [email, setEmail] = useState(getUserEmail())
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [syncBusy, setSyncBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)

  const loadStatus = async () => {
    try {
      const s = await fleetManService.getStatus()
      setLinked(s.linked)
      if (s.email) setEmail(s.email)
    } catch {
      setLinked(false)
    }
  }

  const ensureStatus = async () => {
    if (linked === null) await loadStatus()
  }

  const handleOpenClick = async () => {
    setError(null)
    setHint(null)
    setBusy(true)
    try {
      await ensureStatus()
      const status = await fleetManService.getStatus()
      setLinked(status.linked)
      if (status.email) setEmail(status.email)
      if (!status.linked) {
        setShowModal(true)
        return
      }
      const launch = await fleetManService.launch()
      openFleetMan(launch.redirectUrl)
    } catch (e) {
      setError(formatUserError(e, 'Impossible d’ouvrir FleetMan. Vérifiez votre session et réessayez.'))
    } finally {
      setBusy(false)
    }
  }

  const handleConnect = async () => {
    setError(null)
    if (password.length < 8) {
      setError('Mot de passe : minimum 8 caractères')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    setBusy(true)
    try {
      const result = await fleetManService.connect(password, email || undefined)
      setLinked(true)
      setShowModal(false)
      setPassword('')
      setConfirm('')
      if (result.failedPlates?.length) {
        setHint(`${result.syncedPlates.length} véhicule(s) synchronisé(s), ${result.failedPlates.length} échec(s).`)
      } else {
        setHint(`${result.syncedPlates.length} véhicule(s) poussé(s) vers FleetMan. Connectez-vous avec ${result.email}.`)
      }
      openFleetMan(result.redirectUrl)
      onSynced?.()
    } catch (e) {
      setError(formatUserError(e, 'Connexion FleetMan impossible. Vérifiez le mot de passe et réessayez.'))
    } finally {
      setBusy(false)
    }
  }

  const handleSync = async () => {
    setError(null)
    setHint(null)
    setSyncBusy(true)
    try {
      const r = await fleetManService.sync()
      setHint(`Sync : ${r.created} créé(s), ${r.linked} lié(s)${r.failed.length ? `, ${r.failed.length} échec(s)` : ''}.`)
      onSynced?.()
    } catch (e) {
      setError(formatUserError(e, 'Synchronisation FleetMan impossible. Réessayez dans un instant.'))
    } finally {
      setSyncBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {linked && (
          <button
            type="button"
            onClick={handleSync}
            disabled={syncBusy || busy}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            title="Importer les véhicules créés dans FleetMan"
          >
            {syncBusy ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Synchroniser
          </button>
        )}
        <button
          type="button"
          onClick={handleOpenClick}
          disabled={busy}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <ExternalLink size={15} />}
          Ouvrir FleetMan
        </button>
      </div>
      {hint && <p className="text-xs text-emerald-700 max-w-sm text-right">{hint}</p>}
      {error && !showModal && <p className="text-xs text-red-600 max-w-sm text-right">{error}</p>}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => !busy && setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <p className="text-base font-semibold text-gray-900 mb-1">Connecter FleetMan</p>
            <p className="text-xs text-gray-500 mb-4">
              Créez votre accès FleetMan pour cette agence. Vos véhicules existants seront synchronisés.
              Vous vous connecterez ensuite sur FleetMan avec cet email et ce mot de passe.
            </p>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder="Min. 8 caractères"
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">Confirmer</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
              className="w-full mb-4 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setShowModal(false)}
                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleConnect}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg disabled:opacity-50"
              >
                {busy && <Loader2 size={14} className="animate-spin" />}
                Créer et ouvrir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
