const key = (branchId: string) => `tnt-branch-briefing-${branchId}`;

export interface BranchBriefing {
  message: string;
  updatedAt: string;
  author?: string;
}

export function getBranchBriefing(branchId: string): BranchBriefing | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key(branchId));
    if (!raw) return null;
    return JSON.parse(raw) as BranchBriefing;
  } catch {
    return null;
  }
}

export function saveBranchBriefing(branchId: string, message: string, author?: string): BranchBriefing {
  const briefing: BranchBriefing = {
    message: message.trim(),
    updatedAt: new Date().toISOString(),
    author,
  };
  localStorage.setItem(key(branchId), JSON.stringify(briefing));
  return briefing;
}

export function clearBranchBriefing(branchId: string): void {
  localStorage.removeItem(key(branchId));
}
