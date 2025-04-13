export type ThemeProps = {
  id: number;
  name: string;
  slug: string;
  styles: {
    color: string;
    background: string;
    button: string;
    primary_text: string;
    secondary_text: string;
    link_card?: string;
  };
};
