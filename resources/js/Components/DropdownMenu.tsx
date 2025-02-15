import { PlatformProps } from '@/types/platform';

type Props = {
  handleSelect: (item: PlatformProps) => void;
  platforms: PlatformProps[];
};

export const DropdownMenu = ({ handleSelect, platforms }: Props) => {
  return (
    <div className="top-[3.5rem] right-0 w-[100%] absolute z-50 py-1 max-h-[15rem] flex flex-col overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-md">
      {platforms?.map((item, index) => (
        <>
          <div
            key={Number(new Date())}
            className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(item)}
          >
            <img src={`/assets/images/${item.icon_url}.svg`} alt="" />
            <span>{item.name}</span>
          </div>
          <hr className="mx-2 text-light-gray" />
        </>
      ))}
    </div>
  );
};
