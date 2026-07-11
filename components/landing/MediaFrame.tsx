'use client'

type Kind = 'solid' | 'soft' | 'ghost'
type Cell = { x: string; y: string; size: number; kind: Kind }

const KINDS: Kind[] = ['solid', 'soft', 'ghost', 'soft', 'solid', 'ghost']

/** PRNG déterministe — même seed = même motif (SSR-safe). */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

function pickKind(rand: () => number, offset: number): Kind {
  return KINDS[Math.floor(rand() * KINDS.length + offset) % KINDS.length]
}

/** Bras bas-gauche : grands près du cadre → petits vers la gauche/bas. */
function buildBottomLeft(seed: number): Cell[] {
  const rand = rng(seed)
  const cells: Cell[] = []
  const base = 30 + Math.floor(rand() * 8)
  const gap = 0.38 + rand() * 0.08

  // 2×3 grands
  const bigSizes = [base, base, base - 4, base - 4, base - 8, base - 10]
  const bigPos = [
    [0, 78],
    [13 + rand() * 2, 78],
    [26 + rand() * 2, 79],
    [0, 90],
    [13 + rand() * 2, 90],
    [26 + rand() * 2, 91],
  ]
  bigPos.forEach(([x, y], i) => {
    cells.push({
      x: `${x}%`,
      y: `${y}%`,
      size: bigSizes[i],
      kind: pickKind(rand, i),
    })
  })

  // Trail qui rétrécit
  let size = base - 12
  let x = 40 + rand() * 4
  let y = 80 + rand() * 4
  for (let i = 0; i < 10; i++) {
    cells.push({
      x: `${x}%`,
      y: `${y}%`,
      size: Math.max(4, Math.round(size)),
      kind: pickKind(rand, i + 3),
    })
    size *= 0.78 + rand() * 0.06
    x += 6 + rand() * 4
    y += (rand() - 0.35) * 10 * gap
    y = Math.min(96, Math.max(76, y))
  }
  return cells
}

/** Bras haut-droite : grands près du cadre → petits vers la droite/haut. */
function buildTopRight(seed: number): Cell[] {
  const rand = rng(seed + 97)
  const cells: Cell[] = []
  const base = 30 + Math.floor(rand() * 8)
  const gap = 0.38 + rand() * 0.08

  const bigSizes = [base, base, base - 4, base - 4, base - 8, base - 10]
  const bigPos = [
    [72, 0],
    [85, 0],
    [58 + rand() * 2, 0],
    [72, 11],
    [85, 11],
    [58 + rand() * 2, 10],
  ]
  bigPos.forEach(([x, y], i) => {
    cells.push({
      x: `${x}%`,
      y: `${y}%`,
      size: bigSizes[i],
      kind: pickKind(rand, i + 1),
    })
  })

  let size = base - 12
  let x = 90 + rand() * 2
  let y = 1 + rand() * 3
  for (let i = 0; i < 10; i++) {
    cells.push({
      x: `${Math.min(96, x)}%`,
      y: `${Math.max(0, y)}%`,
      size: Math.max(4, Math.round(size)),
      kind: pickKind(rand, i + 5),
    })
    size *= 0.78 + rand() * 0.06
    x += 1.5 + rand() * 2.5
    y += 3 + rand() * 5 * gap
    y = Math.min(22, y)
  }
  return cells
}

function cellClass(kind: Kind, tone: 'dark' | 'light') {
  if (kind === 'solid') return 'bg-orange-500'
  if (kind === 'soft') {
    return tone === 'dark'
      ? 'border border-orange-300/40 bg-orange-400/40'
      : 'border border-orange-300/45 bg-orange-400/30'
  }
  return tone === 'dark'
    ? 'border border-white/30 bg-white/10'
    : 'border border-slate-300/70 bg-slate-100/60 dark:border-slate-500/60 dark:bg-slate-700/40'
}

/**
 * Motif hero texte — peu de rectangles, plus grands,
 * collés autour du texte, à peine en retrait.
 */
const HERO_RECTS: {
  left: string
  top: string
  w: number
  h: number
  kind: Kind
}[] = [
  // Gauche
  { left: '-7%', top: '10%', w: 72, h: 28, kind: 'solid' },
  { left: '-9%', top: '40%', w: 58, h: 36, kind: 'ghost' },
  { left: '-6%', top: '72%', w: 64, h: 22, kind: 'soft' },

  // Haut
  { left: '8%', top: '-5%', w: 96, h: 20, kind: 'soft' },
  { left: '46%', top: '-6%', w: 72, h: 18, kind: 'ghost' },

  // Droite
  { left: '92%', top: '14%', w: 64, h: 30, kind: 'solid' },
  { left: '95%', top: '46%', w: 52, h: 26, kind: 'soft' },
  { left: '91%', top: '74%', w: 68, h: 20, kind: 'ghost' },

  // Bas
  { left: '6%', top: '98%', w: 88, h: 20, kind: 'solid' },
  { left: '40%', top: '100%', w: 72, h: 18, kind: 'soft' },
  { left: '70%', top: '99%', w: 52, h: 14, kind: 'ghost' },
]

export function HeroTextMotif({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      {HERO_RECTS.map((r, i) => (
        <div
          key={i}
          className={`absolute rounded-md ${cellClass(r.kind, tone)}`}
          style={{
            left: r.left,
            top: r.top,
            width: r.w,
            height: r.h,
          }}
        />
      ))}
    </div>
  )
}

export function AccentGrid({
  className = '',
  tone = 'dark',
  variant = 0,
}: {
  className?: string
  tone?: 'dark' | 'light'
  /** Seed de motif — chaque mockup doit en avoir un différent. */
  variant?: number
}) {
  const seed = 1000 + variant * 7919
  const cells = [...buildTopRight(seed), ...buildBottomLeft(seed)]

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {cells.map((cell, i) => (
        <div
          key={i}
          className={`absolute rounded-md ${cellClass(cell.kind, tone)}`}
          style={{
            left: cell.x,
            top: cell.y,
            width: cell.size,
            height: cell.size,
          }}
        />
      ))}
    </div>
  )
}

/** Cadre média : haut-droite + bas-gauche, motif unique par variant. */
export function FramedMedia({
  children,
  className = '',
  tone = 'dark',
  variant = 0,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'dark' | 'light'
  variant?: number
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-9 z-0 sm:-inset-11">
        <AccentGrid tone={tone} variant={variant} />
      </div>
      <div className="relative z-10 overflow-hidden rounded-xl shadow-xl shadow-black/25 ring-1 ring-black/5 dark:ring-white/10">
        {children}
      </div>
    </div>
  )
}
