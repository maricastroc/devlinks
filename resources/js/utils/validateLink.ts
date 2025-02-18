import { PlatformProps } from "@/types/platform";
import { UserLinkProps } from "@/types/user-link";
import { z } from "zod";

const linkSchema = z.object({
  platform_id: z.number(),
  url: z.string().url({ message: 'Invalid URL. Please, use a valid format.' })
});

const linksSchema = z
  .array(linkSchema)
  .nonempty({ message: 'You need to add at least one link.' });

export const validateLinks = (links: UserLinkProps[], platforms: PlatformProps[]) => {
  const validationResult = linksSchema.safeParse(links);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.format();

    return links.reduce((acc, link, index) => {
      if (formattedErrors) {
        
      }
      const urlError = formattedErrors?.[index] && 'url' in formattedErrors[index]
      ? formattedErrors?.[index]?.url?._errors[0]
      : '';

      const platformError = !platforms.some((p) => p.id === link.platform_id)
        ? 'Invalid platform selected.'
        : '';

      if (urlError || platformError) {
        acc[link.id] = { url: urlError, platform_id: platformError };
      }

      return acc;
    }, {} as Record<number, { url?: string; platform_id?: string }>);
  }

  return null;
};
