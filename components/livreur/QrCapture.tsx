'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, X, ScanLine } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onScan: (code: string) => void;
  title?: string;
  expectedCode?: string;
}

export default function QrCapture({ open, onClose, onScan, title = 'Scanner le colis', expectedCode }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [manual, setManual] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) {
      stopCamera();
      return;
    }

    let cancelled = false;
    setCameraError(null);

    (async () => {
      if (!('BarcodeDetector' in window)) {
        setCameraError('Saisie manuelle — scanner non supporté sur cet appareil');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setScanning(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
        const tick = async () => {
          if (!videoRef.current || cancelled) return;
          try {
            const codes = await detector.detect(videoRef.current);
            if (codes.length > 0) {
              onScan(codes[0].rawValue);
              onClose();
              return;
            }
          } catch { /* ignore frame errors */ }
          if (!cancelled) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      } catch {
        setCameraError('Caméra indisponible — utilisez la saisie manuelle');
      }
    })();

    return () => {
      cancelled = true;
      stopCamera();
      setScanning(false);
    };
  }, [open, onClose, onScan, stopCamera]);

  if (!open) return null;

  const submitManual = () => {
    const code = manual.trim();
    if (!code) return;
    onScan(code);
    setManual('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ScanLine size={18} className="text-orange-500" />
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {expectedCode && (
            <p className="text-xs text-gray-500">
              Code attendu : <span className="font-mono font-semibold text-gray-800">{expectedCode}</span>
            </p>
          )}

          {!cameraError ? (
            <div className="relative aspect-[4/3] bg-gray-900 rounded-xl overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              {scanning && (
                <div className="absolute inset-8 border-2 border-orange-400/80 rounded-xl pointer-events-none" />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center aspect-[4/3] bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Camera size={32} className="text-gray-300 mb-2" />
              <p className="text-xs text-gray-500 text-center px-4">{cameraError}</p>
            </div>
          )}

          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Saisie manuelle</label>
            <div className="flex gap-2 mt-1">
              <input
                value={manual}
                onChange={e => setManual(e.target.value)}
                placeholder="Manifeste / code colis"
                className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
              <button
                type="button"
                onClick={submitManual}
                className="h-10 px-4 rounded-xl bg-orange-500 text-white text-sm font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
