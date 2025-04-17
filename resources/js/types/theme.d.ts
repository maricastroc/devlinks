export type ThemeProps = {
  id: number;
  name: string;
  slug: string;
  is_light: boolean;
  styles: {
    color: string;
    background: string;
    button: string;
    primary_text: string;
    secondary_text: string;
    link_card?: string;
  };
};
