import type { Mission } from '@/lib/types';

export interface EscalationContext {
  branchName: string;
  agencyName?: string;
  mission: Mission;
  reason: string;
}

export function buildEscalationMessage(ctx: EscalationContext): string {
  const { mission, branchName, agencyName, reason } = ctx;
  return [
    '[TiiBnTick — Escalade Antenne]',
    `Antenne: ${branchName}`,
    agencyName ? `Agence: ${agencyName}` : null,
    `Mission: ${mission.manifestNumber}`,
    `Destinataire: ${mission.recipientName}`,
    `Adresse: ${mission.deliveryAddress}`,
    `Statut: ${mission.status}`,
    mission.delivererName ? `Livreur: ${mission.delivererName}` : 'Livreur: non assigné',
    `Motif: ${reason}`,
    `Horodatage: ${new Date().toLocaleString('fr-FR')}`,
  ].filter(Boolean).join('\n');
}

export async function copyEscalationMessage(ctx: EscalationContext): Promise<void> {
  await navigator.clipboard.writeText(buildEscalationMessage(ctx));
}

export function openEscalationEmail(ctx: EscalationContext, toEmail?: string): void {
  const subject = encodeURIComponent(
    `[Escalade] ${ctx.mission.manifestNumber} — ${ctx.branchName}`,
  );
  const body = encodeURIComponent(buildEscalationMessage(ctx));
  const to = toEmail ? encodeURIComponent(toEmail) : '';
  window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');
}
