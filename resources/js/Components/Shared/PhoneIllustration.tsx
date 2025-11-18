export const PhoneIllustration = () => {
  return (
    <div
      aria-hidden="true"
      className="relative align-middle w-[307px] h-[631px] rounded-3xl md:shadow-2xl border-8 border-gray-800"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-10 w-24 h-6 -translate-x-1/2 bg-gray-800 rounded-b-lg shadow-[inset_0_-3px_5px_rgba(0,0,0,0.3)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-24 w-1 h-16 bg-gray-700 rounded-l-lg shadow-[inset_-2px_0_3px_rgba(0,0,0,0.3)]"
      />
    </div>
  );
};
