interface FormHeaderProps {
  title: string;
  description: string;
}

export const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <header className="mb-8">
      <h1
        id="login-title"
        className="mb-2 text-[1.7rem] md:text-[2rem] font-bold text-dark-gray"
      >
        {title}
      </h1>
      <p className="text-medium-gray">{description}</p>
    </header>
  );
};
