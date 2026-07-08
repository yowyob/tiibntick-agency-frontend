'use client'

import { useEffect, useState } from 'react'
import { Bell, Shield, Globe, Zap, Moon, Sun, Monitor, Save, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { agencyService } from '@/lib/services/agencyService'
import { getAgencyId } from '@/lib/session'
import { normalizePercentRate } from '@/lib/api/mappers'
import { useToast } from '@/contexts/ToastContext'
import { toastErrorMessage } from '@/lib/toastError'

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${value ? 'bg-orange-500' : 'bg-gray-200 dark:bg-slate-600'}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { success: toastSuccess, error: toastError } = useToast()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [notifSettings, setNotifSettings] = useState({
    sms: true, email: true, push: true, whatsapp: false,
  })
  const [autoSettings, setAutoSettings] = useState({
    autoAssign: true,
    allowFreelancers: true,
    reroute: false,
    hubAlerts: true,
  })
  const [agencySettings, setAgencySettings] = useState({
    hubRetentionDelayHours: 72,
    maxActiveBranches: 10,
    defaultCommissionRate: 10,
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true, auditLog: true,
  })

  useEffect(() => {
    setLoading(true)
    agencyService.getAgency(getAgencyId())
      .then(agency => {
        setAutoSettings(s => ({
          ...s,
          autoAssign: agency.autoAssignMissions,
          allowFreelancers: agency.allowFreelancerAssociation,
        }))
        setAgencySettings({
          hubRetentionDelayHours: agency.hubRetentionDelayHours,
          maxActiveBranches: agency.maxActiveBranches ?? 10,
          defaultCommissionRate: normalizePercentRate(agency.defaultCommissionRate ?? 10),
        })
      })
      .catch(err => toastError(toastErrorMessage(err, 'Impossible de charger les paramètres agence.')))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await agencyService.updateSettings(getAgencyId(), {
        autoAssignMissions: autoSettings.autoAssign,
        allowFreelancerAssociation: autoSettings.allowFreelancers,
        hubRetentionDelayHours: agencySettings.hubRetentionDelayHours,
        maxActiveBranches: agencySettings.maxActiveBranches,
        defaultCommissionRate: agencySettings.defaultCommissionRate,
        timezone: 'Africa/Douala',
      })
      toastSuccess('Paramètres enregistrés.')
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'enregistrer les paramètres. Réessayez.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-48">
        <Loader2 size={24} className="animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Paramètres</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configuration système de l&apos;agence</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Dark mode section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
            {theme === 'dark' ? <Moon size={17} className="text-orange-500" /> : <Sun size={17} className="text-orange-500" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Apparence</h3>
            <p className="text-xs text-gray-400">Choisir le thème d&apos;affichage de la plateforme</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light' as const, label: 'Clair', icon: Sun, desc: 'Interface lumineuse' },
            { id: 'dark'  as const, label: 'Sombre', icon: Moon, desc: 'Bleu nuit — reposant' },
            { id: 'system' as const, label: 'Système', icon: Monitor, desc: 'Suit votre OS' },
          ].map(opt => {
            const active = opt.id === 'system' ? false : theme === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.id === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                    setTheme(prefersDark ? 'dark' : 'light')
                  } else {
                    setTheme(opt.id)
                  }
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  active ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <opt.icon size={20} className={active ? 'text-orange-500' : 'text-gray-400'} />
                <div className="text-center">
                  <p className={`text-sm font-semibold ${active ? 'text-orange-700' : 'text-gray-700'}`}>{opt.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Notifications — préférences locales (tnt-notify-core en prod) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Bell size={17} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <p className="text-xs text-gray-400">Canaux activés côté navigateur (envoi via TiiBnTick Notify)</p>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-gray-100">
            {[
              { key: 'sms' as const, label: 'SMS' },
              { key: 'email' as const, label: 'Email' },
              { key: 'push' as const, label: 'Push App' },
              { key: 'whatsapp' as const, label: 'WhatsApp' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">{item.label}</span>
                <Toggle value={notifSettings[item.key]} onChange={v => setNotifSettings(p => ({ ...p, [item.key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Automatisation — persisté via API agence */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Zap size={17} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Automatisation</h3>
              <p className="text-xs text-gray-400">Règles d&apos;assignation et dispatch automatique</p>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-gray-100">
            {[
              { key: 'autoAssign' as const, label: 'Auto-assignation des missions' },
              { key: 'allowFreelancers' as const, label: 'Associations freelancers autorisées' },
              { key: 'reroute' as const, label: 'Reroutage automatique' },
              { key: 'hubAlerts' as const, label: 'Alertes hub plein' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">{item.label}</span>
                <Toggle value={autoSettings[item.key]} onChange={v => setAutoSettings(p => ({ ...p, [item.key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Paramètres agence */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Globe size={17} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Paramètres opérationnels</h3>
              <p className="text-xs text-gray-400">Hubs, commissions et antennes</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-gray-500">Rétention hub (heures)</span>
              <input
                type="number"
                min={24}
                max={168}
                value={agencySettings.hubRetentionDelayHours}
                onChange={e => setAgencySettings(s => ({ ...s, hubRetentionDelayHours: parseInt(e.target.value) || 72 }))}
                className="mt-1 w-full h-9 px-3 text-sm border border-gray-200 rounded-lg"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-500">Antennes actives max.</span>
              <input
                type="number"
                min={1}
                max={100}
                value={agencySettings.maxActiveBranches}
                onChange={e => setAgencySettings(s => ({ ...s, maxActiveBranches: parseInt(e.target.value) || 10 }))}
                className="mt-1 w-full h-9 px-3 text-sm border border-gray-200 rounded-lg"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-500">Commission par défaut (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={agencySettings.defaultCommissionRate}
                onChange={e => setAgencySettings(s => ({ ...s, defaultCommissionRate: parseFloat(e.target.value) || 10 }))}
                className="mt-1 w-full h-9 px-3 text-sm border border-gray-200 rounded-lg"
              />
            </label>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Shield size={17} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Sécurité & Accès</h3>
              <p className="text-xs text-gray-400">Authentification via YowAuth0 (TiiBnTick Core)</p>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-gray-100">
            {[
              { key: 'twoFactor' as const, label: 'Authentification 2FA' },
              { key: 'auditLog' as const, label: "Journal d'audit" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">{item.label}</span>
                <Toggle value={securitySettings[item.key]} onChange={v => setSecuritySettings(p => ({ ...p, [item.key]: v }))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
