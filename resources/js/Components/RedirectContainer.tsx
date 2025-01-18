type RedirectContainerProps = {
  title: string;
  redirectLink: string;
  text: string;
};

export function RedirectContainer({
  title,
  redirectLink,
  text
}: RedirectContainerProps) {
  return (
    <div className="flex justify-center w-full align-center card-actions">
      <div className="flex items-center gap-2 mt-4 text-center">
        <span className="text-gray-400 text-medium">{title}</span>
        <a
          href={redirectLink}
          className="font-bold text-gray-200 transition-all duration-100 hover:text-content link link-hover text-medium"
        >
          {text}
        </a>
      </div>
    </div>
  );
}
