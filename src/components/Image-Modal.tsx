import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from 'lucide-react'

interface ImageModalProps {
  imageUrl: string
  altText: string
}

export function ImageModal({ imageUrl, altText }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          <DialogTrigger asChild>
            <button
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

