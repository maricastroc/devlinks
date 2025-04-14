import EmptyMockup from '/public/assets/images/illustration-empty.svg';

export const EmptyLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 mt-10 text-center rounded-md bg-light-gray">
      <img src={EmptyMockup} alt="" className="mt-6" />
      <h2 className="mt-6 mb-2 text-[1.4rem] md:text-[2rem] font-black text-dark-gray">
        Let's get you started
      </h2>
      <p className="mt-2 mb-8 max-w-[32rem] text-medium-gray">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};
