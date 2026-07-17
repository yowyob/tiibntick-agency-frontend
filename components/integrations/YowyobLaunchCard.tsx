'use client';

import { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { yowyobIntegrationService, type YowyobApp } from '@/lib/services/yowyobIntegrationService';
import { useToast } from '@/contexts/ToastContext';
import { toastErrorMessage } from '@/lib/toastError';
import { getUserRole } from '@/lib/session';
import { canLaunchYowyobApp } from '@/lib/yowyobAccess';

interface Props {
  app: YowyobApp;
  title: string;
  description: string;
  accent?: 'violet' | 'blue' | 'emerald';
}

const ACCENTS = {
  violet: {
    wrap: 'bg-violet-50 border-violet-100',
    title: 'text-violet-900',
    desc: 'text-violet-700',
    btn: 'bg-violet-600 hover:bg-violet-700',
  },
  blue: {
    wrap: 'bg-blue-50 border-blue-100',
    title: 'text-blue-900',
    desc: 'text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  emerald: {
    wrap: 'bg-emerald-50 border-emerald-100',
    title: 'text-emerald-900',
    desc: 'text-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
  },
};

const BUTTON_LABELS: Record<YowyobApp, string> = {
  HRM: 'Accéder à HRM',
  BILLING: 'Accéder à Billing',
  ACCOUNTING: 'Accéder à Accounting',
};

export default function YowyobLaunchCard({ app, title, description, accent = 'violet' }: Props) {
  const [loading, setLoading] = useState(false);
  const { error: toastError } = useToast();
  const colors = ACCENTS[accent];
  const role = getUserRole();

  if (!canLaunchYowyobApp(app, role)) {
    return null;
  }

  const handleLaunch = async () => {
    setLoading(true);
    try {
      await yowyobIntegrationService.open(app);
    } catch (err) {
      toastError(toastErrorMessage(err, 'Impossible d\'ouvrir l\'application YowYob.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`border rounded-xl p-4 flex items-start justify-between gap-4 ${colors.wrap}`}>
      <div>
        <p className={`text-sm font-semibold ${colors.title}`}>{title}</p>
        <p className={`text-xs mt-1 leading-relaxed ${colors.desc}`}>{description}</p>
      </div>
      <button
        type="button"
        onClick={() => void handleLaunch()}
        disabled={loading}
        className={`inline-flex items-center gap-2 shrink-0 px-3 py-2 text-xs font-medium text-white rounded-lg transition-colors disabled:opacity-70 ${colors.btn}`}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <ExternalLink size={14} />}
        {BUTTON_LABELS[app]}
      </button>
    </div>
  );
}
