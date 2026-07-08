import type { BranchShiftSummary } from '@/lib/branch/actionQueue';
import type { Mission } from '@/lib/types';

export function buildShiftReportCsv(
  branchName: string,
  summary: BranchShiftSummary,
  missions: Mission[],
): string {
  const date = new Date().toLocaleDateString('fr-FR');
  const lines: string[] = [
    `Rapport de shift — ${branchName}`,
    `Date;${date}`,
    '',
    'Indicateur;Valeur',
    `Missions en cours;${summary.active}`,
    `Livrées;${summary.delivered}`,
    `En attente;${summary.pending}`,
    `Échouées;${summary.failed}`,
    `Chiffre d'affaires livré (XAF);${summary.revenueXaf}`,
    '',
    'Bordereau;Destinataire;Livreur;Statut;Montant;Devise',
  ];

  for (const m of missions) {
    lines.push([
      m.manifestNumber,
      m.recipientName,
      m.delivererName ?? 'Non assigné',
      m.status,
      String(m.sellingPrice ?? 0),
      m.currency ?? 'XAF',
    ].join(';'));
  }

  return lines.join('\n');
}

export function downloadShiftReport(
  branchName: string,
  summary: BranchShiftSummary,
  missions: Mission[],
): void {
  const csv = buildShiftReportCsv(branchName, summary, missions);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const slug = branchName.replace(/\s+/g, '-').toLowerCase();
  const stamp = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shift-${slug}-${stamp}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
