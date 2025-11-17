/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
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

  const [isCropping, setIsCropping] = useState(true);

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
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-4 bg-white w-auto max-w-[30rem] rounded-lg">
        {isCropping ? (
          <>
            <Cropper
              src={src}
              style={{
                height: 400,
                width: '100%'
              }}
              initialAspectRatio={aspectRatio}
              aspectRatio={aspectRatio}
              guides={true}
              ref={cropperRef}
            />
            <div className="flex justify-end gap-2 mt-4">
              <SecondaryButton
                onClick={() => {
                  setIsCropping(false);
                  onClose();
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleCrop} className="px-4 py-2 rounded">
                Crop Image
              </PrimaryButton>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
