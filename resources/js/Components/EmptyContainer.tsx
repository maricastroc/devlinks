import LinkButton from '@/Components/LinkButton'

interface Props {
  imagePath: string
  title: string
  content: string
  url: string
}

export function EmptyContainer({ imagePath, title, content, url }: Props) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow h-full py-12">
      <img src={imagePath} alt="" />
      <p className="mt-10 mb-4 text-large text-content">{content}</p>
      <LinkButton href={url}>{title}</LinkButton>
    </div>
  )
}
