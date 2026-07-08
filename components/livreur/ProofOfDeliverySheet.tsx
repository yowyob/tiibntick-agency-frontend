'use client';

import { useRef, useState } from 'react';
import { Camera, PenLine, X, CheckCircle, Loader2 } from 'lucide-react';

export interface ProofResult {
  photoBlob?: Blob;
  signatureDataUrl?: string;
  otpCode?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (proof: ProofResult) => Promise<void>;
  recipientName: string;
}

export default function ProofOfDeliverySheet({ open, onClose, onConfirm, recipientName }: Props) {
  const [step, setStep] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | undefined>();
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | undefined>();
  const [otpCode, setOtpCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  if (!open) return null;

  const reset = () => {
    setStep(0);
    setPhotoPreview(null);
    setPhotoBlob(undefined);
    setSignatureDataUrl(undefined);
    setOtpCode('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      await new Promise(r => setTimeout(r, 300));
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      stream.getTracks().forEach(t => t.stop());
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.85));
      if (!blob) return;
      setPhotoBlob(blob);
      setPhotoPreview(canvas.toDataURL('image/jpeg', 0.85));
      setStep(1);
    } catch {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;
        setPhotoBlob(file);
        setPhotoPreview(URL.createObjectURL(file));
        setStep(1);
      };
      input.click();
    }
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111827';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const endDraw = () => {
    drawing.current = false;
    if (canvasRef.current) {
      setSignatureDataUrl(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(undefined);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onConfirm({ photoBlob, signatureDataUrl, otpCode: otpCode.trim() || undefined });
      reset();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const steps = ['Photo', 'Signature', 'Confirmer'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Preuve de livraison</p>
            <h3 className="text-sm font-bold text-gray-900">{recipientName}</h3>
          </div>
          <button type="button" onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 px-5 pt-4">
          {steps.map((label, i) => (
            <div key={label} className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div className="p-5 space-y-4 pb-8">
          {step === 0 && (
            <>
              <p className="text-sm text-gray-600">Prenez une photo du colis livré.</p>
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="Preuve" className="w-full rounded-xl border border-gray-100" />
              ) : (
                <button
                  type="button"
                  onClick={() => void capturePhoto()}
                  className="w-full h-40 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 flex flex-col items-center justify-center gap-2"
                >
                  <Camera size={28} className="text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600">Prendre une photo</span>
                </button>
              )}
              {photoPreview && (
                <button type="button" onClick={() => setStep(1)} className="w-full h-12 rounded-xl bg-orange-500 text-white font-semibold">
                  Continuer
                </button>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-gray-600">Signature du destinataire.</p>
              <div className="relative rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={160}
                  className="w-full touch-none"
                  onPointerDown={startDraw}
                  onPointerMove={draw}
                  onPointerUp={endDraw}
                  onPointerLeave={endDraw}
                />
                <button
                  type="button"
                  onClick={clearSignature}
                  className="absolute top-2 right-2 text-[10px] font-semibold text-gray-500 bg-white/90 px-2 py-1 rounded-lg"
                >
                  Effacer
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <PenLine size={12} />
                Signez avec le doigt
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!signatureDataUrl}
                className="w-full h-12 rounded-xl bg-orange-500 text-white font-semibold disabled:opacity-40"
              >
                Continuer
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-gray-600">Code de confirmation (optionnel).</p>
              <input
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4 chiffres"
                inputMode="numeric"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 text-center text-lg font-mono tracking-widest"
              />
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-800">
                  Photo + signature seront enregistrées et une preuve blockchain sera générée.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={submitting || !photoBlob}
                className="w-full h-12 rounded-xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Confirmer la livraison'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
