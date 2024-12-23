import { Play } from 'lucide-react';

interface VideoPreviewButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function VideoPreviewButton({ onClick, loading, disabled }: VideoPreviewButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
    >
      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Play className="w-6 h-6 text-black ml-1" />
      </div>
    </button>
  );
}