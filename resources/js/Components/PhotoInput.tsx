import UploadImage from '/public/assets/images/icon-upload-image.svg';

type PhotoInputProps = {
  photoPreview: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputFileRef: React.RefObject<HTMLInputElement>;
  error: string | undefined;
  isProfileScreen?: boolean;
  withMarginTop?: boolean;
  isLoading?: boolean;
};

export const PhotoInput = ({
  photoPreview,
  onChange,
  inputFileRef,
  isLoading = false
}: PhotoInputProps) => {
  return (
    <div className="flex flex-col items-start w-full gap-4 md:justify-between md:items-center md:flex-row">
      <p className="md:w-[10rem] text-medium-gray">Profile picture</p>

      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-end md:gap-6">
        <button
          type="button"
          onClick={() => {
            if (inputFileRef.current) {
              inputFileRef.current.click();
            }
          }}
          className={`hover:border ${
            photoPreview
              ? 'hover:border-transparent'
              : 'hover:border-medium-purple'
          } transition-all hover:shadow-lg duration-125 flex flex-col items-center justify-center relative h-[12rem] w-[12rem] rounded-md bg-light-purple`}
        >
          {photoPreview ? (
            <div
              className="relative flex flex-col items-center justify-center w-full h-full gap-1 bg-center bg-cover rounded-lg"
              style={{ backgroundImage: `url(${photoPreview})` }}
            >
              <img
                src={UploadImage}
                alt="Avatar Preview"
                className="z-50"
                style={{ filter: 'saturate(0%) brightness(318%)' }}
              />
              <p className="z-50 text-lg font-bold text-white">
                + Change Image
              </p>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <img src={UploadImage} alt="Avatar Preview" />
              <p className="font-semibold text-md text-medium-purple">
                + Upload Image
              </p>
            </div>
          )}
        </button>

        <p className="md:w-[9rem] mt-3 md:mt-0 text-xs text-medium-gray">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>

      <input
        type="file"
        name="photo_url"
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={onChange}
        disabled={isLoading}
        className="w-0"
      />
    </div>
  );
};
