type PhotoInputProps = {
  children: React.ReactNode;
  title: string;
  wrap?: boolean;
};

export const ProfileSection = ({
  children,
  title,
  wrap = false
}: PhotoInputProps) => {
  return (
    <div className="flex flex-col w-full p-5 rounded-md md:p-7 bg-light-gray">
      <div
        className={`flex ${wrap ? 'flex-wrap justify-between' : 'flex-col'} items-start w-full gap-4 md:justify-between md:items-center md:flex-row`}
      >
        <p className="md:w-[10rem] text-medium-gray">{title}</p>
        {children}
      </div>
    </div>
  );
};
