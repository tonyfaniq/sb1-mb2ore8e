interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <video 
      src={src}
      title={title}
      controls
      playsInline
      muted
      loop
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}