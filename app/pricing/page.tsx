import { redirect } from 'next/navigation'

/** Ancienne URL anglaise — redirige vers /tarifs. */
export default function PricingRedirect() {
  redirect('/tarifs')
}
