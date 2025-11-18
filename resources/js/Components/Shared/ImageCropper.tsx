/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';

interface ImageCropperProps {
  src: string;
  onCrop: (croppedImage: string) => void;
  aspectRatio?: number;
  onClose: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  onClose,
  src,
  onCrop,
  aspectRatio = 1
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const [isCropping, setIsCropping] = useState(true);

  useEffect(() => {
    cancelBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [onClose]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = (cropperRef.current as any).cropper;
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 2048,
        maxHeight: 2048,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      });

      onCrop(croppedCanvas.toDataURL());
      setIsCropping(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cropper-title"
    >
      <div className="p-4 bg-white w-auto max-w-[30rem] rounded-lg shadow-lg">
        <h1 id="cropper-title" className="sr-only">
          Crop your image
        </h1>

        {isCropping && (
          <>
            <Cropper
              src={src}
              style={{ height: 400, width: '100%' }}
              initialAspectRatio={aspectRatio}
              aspectRatio={aspectRatio}
              guides={true}
              ref={cropperRef}
              alt=""
              aria-hidden="true"
            />

            <div className="flex justify-end gap-2 mt-4">
              <SecondaryButton
                ref={cancelBtnRef}
                type="button"
                onClick={() => {
                  setIsCropping(false);
                  onClose();
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                type="button"
                onClick={handleCrop}
                className="px-4 py-2 rounded"
              >
                Crop Image
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
