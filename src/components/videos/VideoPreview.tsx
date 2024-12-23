interface VideoPreviewProps {
  src: string | null;
  poster?: string;
  isVideo: boolean;
  title: string;
  loading: boolean;
  error: string | null;
}

export function VideoPreview({ 
  src, 
  poster, 
  isVideo, 
  title,
  loading,
  error 
}: VideoPreviewProps) {
  if (loading) {
    return (
      <div className="relative aspect-[9/16] bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading preview...</div>
      </div>
    );
  }

  if (error || !src) {
    return (
      <div className="relative aspect-[9/16] bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">
          {error || 'No preview available'}
        </div>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="relative aspect-[9/16] bg-gray-900">
        <video 
          src={src}
          poster={poster}
          controls
          playsInline
          muted
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error('Video failed to load:', e);
            e.currentTarget.style.display = 'none';
            if (poster) {
              const img = document.createElement('img');
              img.src = poster;
              img.alt = title;
              img.className = 'absolute inset-0 w-full h-full object-cover';
              e.currentTarget.parentElement?.appendChild(img);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[9/16] bg-gray-900">
      <img 
        src={src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          console.error('Image failed to load:', e);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}