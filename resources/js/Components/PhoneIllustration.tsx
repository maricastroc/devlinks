export const PhoneIllustration = () => {
  return (
    <div className="relative w-[307px] h-[631px] rounded-3xl shadow-2xl border-8 border-gray-800 bg-white">
      <div className="absolute top-0 z-10 w-24 h-6 transform -translate-x-1/2 bg-gray-800 rounded-b-lg left-1/2"></div>

      <div className="absolute overflow-hidden bg-white inset-2 rounded-2xl">
        <div className="flex flex-col items-center justify-start h-full text-gray-400 mt-[3.1rem]">
          <span className="bg-[#EEEEEE] w-[5.8rem] h-[5.8rem] rounded-full" />
          <span className="bg-[#EEEEEE] w-[10rem] h-[1rem] rounded-full mt-[1.5rem]" />
          <span className="bg-[#EEEEEE] w-[5rem] h-[0.8rem] rounded-full mt-[1.1rem]" />

          <div className="flex flex-col items-center justify-start gap-[1.05rem] mt-[3rem]">
            <span className="bg-[#EEEEEE] w-[15rem] h-[2.9rem] rounded-xl" />
            <span className="bg-[#EEEEEE] w-[15rem] h-[2.9rem] rounded-xl" />
            <span className="bg-[#EEEEEE] w-[15rem] h-[2.9rem] rounded-xl" />
            <span className="bg-[#EEEEEE] w-[15rem] h-[2.9rem] rounded-xl" />
            <span className="bg-[#EEEEEE] w-[15rem] h-[2.9rem] rounded-xl" />
          </div>
        </div>
      </div>

      <div className="absolute right-0 w-1 h-16 bg-gray-700 rounded-l-lg top-24"></div>
    </div>
  );
};
