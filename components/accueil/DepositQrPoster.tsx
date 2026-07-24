'use client'

import { useCallback, useRef } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { Download, Printer } from 'lucide-react'
import { intakeTrackHomeUrl } from '@/lib/services/intakeService'

interface Props {
  depositUrl: string
  agencyName: string
  branchName: string
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'agence'
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

export default function DepositQrPoster({ depositUrl, agencyName, branchName }: Props) {
  const qrHostRef = useRef<HTMLDivElement>(null)
  const trackHome = intakeTrackHomeUrl()

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownloadPng = useCallback(() => {
    const qrCanvas = qrHostRef.current?.querySelector('canvas')
    if (!qrCanvas) return

    const W = 1240
    const H = 1754
    const out = document.createElement('canvas')
    out.width = W
    out.height = H
    const ctx = out.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#F7F6F4'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, W, 320)
    ctx.fillStyle = '#F97316'
    ctx.fillRect(0, 320, W, 8)

    ctx.fillStyle = '#111827'
    ctx.textAlign = 'center'
    ctx.font = '600 28px system-ui, sans-serif'
    ctx.fillText('TiiBnTick Agency', W / 2, 110)

    const name = agencyName || 'Agence'
    ctx.font = '700 48px system-ui, sans-serif'
    ctx.fillText(name, W / 2, 190)

    ctx.fillStyle = '#6B7280'
    ctx.font = '500 26px system-ui, sans-serif'
    ctx.fillText(branchName ? `Antenne · ${branchName}` : 'Dépôt client', W / 2, 250)

    const qrSize = 560
    const qrX = (W - qrSize) / 2
    const qrY = 420
    ctx.fillStyle = '#FFFFFF'
    roundRect(ctx, qrX - 40, qrY - 40, qrSize + 80, qrSize + 80, 28)
    ctx.fill()
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)

    const infoY = qrY + qrSize + 140
    ctx.fillStyle = '#111827'
    ctx.font = '600 30px system-ui, sans-serif'
    ctx.fillText('Scannez pour déposer un colis', W / 2, infoY)

    ctx.fillStyle = '#4B5563'
    ctx.font = '400 24px system-ui, sans-serif'
    ;[
      '1. Ouvrez l’appareil photo de votre téléphone',
      '2. Scannez ce QR et validez le formulaire',
      '3. Présentez-vous à l’accueil si besoin d’aide',
      `Suivi colis : ${trackHome.replace(/^https?:\/\//, '')}`,
    ].forEach((line, i) => {
      ctx.fillText(line, W / 2, infoY + 70 + i * 42)
    })

    ctx.fillStyle = '#9CA3AF'
    ctx.font = '400 16px ui-monospace, monospace'
    const shortUrl = depositUrl.length > 78 ? `${depositUrl.slice(0, 75)}…` : depositUrl
    ctx.fillText(shortUrl, W / 2, H - 80)

    const a = document.createElement('a')
    a.download = `tiibntick-qr-${slugify(agencyName)}-${slugify(branchName || 'antenne')}.png`
    a.href = out.toDataURL('image/png')
    a.click()
  }, [agencyName, branchName, depositUrl, trackHome])

  return (
    <div className="space-y-4">
      <div ref={qrHostRef} className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" aria-hidden>
        <QRCodeCanvas value={depositUrl} size={1024} level="M" includeMargin />
      </div>

      <div className="deposit-qr-poster mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F6F4] shadow-sm">
        <div className="bg-white px-8 pt-8 pb-6 text-center border-b-4 border-orange-500">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            TiiBnTick Agency
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
            {agencyName || 'Agence'}
          </h2>
          {branchName ? (
            <p className="mt-2 text-sm font-medium text-gray-500">Antenne · {branchName}</p>
          ) : null}
        </div>

        <div className="flex flex-col items-center px-8 py-10">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <QRCodeSVG value={depositUrl} size={220} level="M" />
          </div>
          <p className="mt-6 text-center text-base font-semibold text-gray-900">
            Scannez pour déposer un colis
          </p>
          <ul className="mt-4 space-y-1.5 text-center text-sm text-gray-600 leading-relaxed">
            <li>Ouvrez l&apos;appareil photo de votre téléphone</li>
            <li>Scannez ce QR et validez le formulaire</li>
            <li>Présentez-vous à l&apos;accueil si besoin d&apos;aide</li>
          </ul>
          <p className="mt-5 text-center text-xs text-gray-500">
            Suivi colis :{' '}
            <span className="font-medium text-gray-700">{trackHome.replace(/^https?:\/\//, '')}</span>
          </p>
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-3">
          <p className="text-[10px] text-center text-gray-400 font-mono break-all leading-relaxed">
            {depositUrl}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Printer size={16} /> Imprimer l&apos;affiche
        </button>
        <button
          type="button"
          onClick={handleDownloadPng}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
        >
          <Download size={16} /> Télécharger PNG
        </button>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .deposit-qr-poster,
          .deposit-qr-poster * {
            visibility: visible !important;
          }
          .deposit-qr-poster {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  )
}
