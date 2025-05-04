export const CustomItem = ({ onSelect }: { onSelect: () => void }) => (
  <button
    className="flex items-center justify-between gap-3 p-3 transition-all duration-150 bg-transparent border-b border-gray-200 rounded-lg hover:bg-gray-100"
    onClick={() => onSelect()}
  >
    <div className="flex items-center justify-start gap-4">
      <img className="w-10 h-10" src={`assets/images/icon-color-custom.svg`} />
      <div className="flex flex-col items-start justify-start gap-[0.1rem] text-start">
        <p className="font-semibold md:text-md text-dark-gray">Custom Link</p>
        <p className="text-sm font-thin text-gray-500 md:text-[0.95rem]">
          Add any URL of your choice
        </p>
      </div>
    </div>

    <button className="text-sm font-semibold md:text-md text-medium-purple">
      Add
    </button>
  </button>
);
