import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoPopup({ isOpen, onClose, videoUrl, title }: VideoPopupProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-black rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <Dialog.Title className="text-white font-medium">{title}</Dialog.Title>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="aspect-[9/16]">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}