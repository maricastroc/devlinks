import { useTheme } from '@/contexts/ThemeContext';
import { UserProps } from '@/types/user';
import { UserLinkProps } from '@/types/user-link';
import { DEFAULT_THEME } from '@/utils/constants';

type PhoneIllustrationProps = {
  links: UserLinkProps[];
  firstName?: string | null;
  lastName?: string | null;
  publicEmail?: string | null;
  user?: UserProps;
};

export const PhoneIllustration = ({
  user,
  firstName,
  lastName,
  publicEmail,
  links
}: PhoneIllustrationProps) => {
  const { currentTheme } = useTheme();
  const isDefaultTheme = currentTheme?.name === DEFAULT_THEME;

  const hasName = Boolean(
    firstName?.length || lastName?.length || user?.first_name || user?.last_name
  );

  const hasEmail = Boolean(publicEmail?.length || user?.public_email);

  const containerBg = isDefaultTheme
    ? 'bg-white'
    : currentTheme?.styles.background;

  const placeholderBg = isDefaultTheme ? 'bg-[#EEEEEE]' : 'bg-transparent';

  // Número de placeholders que devem ser transparentes (igual ao número de links)
  const transparentPlaceholders = Math.min(links.length, 5);

  return (
    <div
      className={`relative w-[307px] h-[631px] rounded-3xl shadow-2xl border-8 border-gray-800 ${containerBg}`}
    >
      <div className="absolute top-0 z-10 w-24 h-6 transform -translate-x-1/2 bg-gray-800 rounded-b-lg left-1/2" />

      <div
        className={`absolute overflow-hidden inset-2 rounded-2xl ${containerBg}`}
      >
        <div className="flex flex-col items-center justify-start h-full text-gray-400 mt-[3.1rem]">
          <span
            className={`${placeholderBg} w-[5.5rem] h-[5.5rem] rounded-full`}
          />
          <span
            className={`${!isDefaultTheme && hasName ? 'bg-transparent' : 'bg-[#EEEEEE]'} w-[10rem] h-[1rem] rounded-full mt-[1.75rem]`}
          />
          <span
            className={`${!isDefaultTheme && hasEmail ? 'bg-transparent' : 'bg-[#EEEEEE]'} w-[5rem] h-[0.8rem] rounded-full mt-[0.8rem]`}
          />
          <div className="flex flex-col items-center justify-start gap-[1.25rem] mt-[3.4rem]">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <span
                  key={index}
                  className={`${index < transparentPlaceholders && !isDefaultTheme ? 'bg-transparent' : 'bg-[#EEEEEE]'} w-[14.6rem] h-[2.7rem] rounded-lg`}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 w-1 h-16 bg-gray-700 rounded-l-lg top-24" />
    </div>
  );
};
