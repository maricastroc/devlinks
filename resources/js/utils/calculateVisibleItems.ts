type Props = {
  containerWidth: number;
  platformsLength: number;
};
export const calculateVisibleItems = ({
  containerWidth,
  platformsLength
}: Props) => {
  if (!containerWidth) return platformsLength;

  const itemWidth = 100;
  return Math.floor(containerWidth / itemWidth);
};
