import InputLabel from '@/Components/InputLabel'
import TertiaryButton from '@/Components/TertiaryButton'
import TextInput from '@/Components/TextInput'
import { TemplateProps } from '@/types/template'
import { cleanHTML } from '@/utils/cleanHtml'
import { DataProps } from '../Form'
import Checkbox from '@/Components/Checkbox'
import { EmailListProps } from '@/types/emailList'

type CampaignStep1Props = {
  templates: TemplateProps[]
  data: DataProps
  selectedList: EmailListProps | null
  setData: (key: string, value: any) => void
}

export default function Step3({
  data,
  templates,
  selectedList,
  setData,
}: CampaignStep1Props) {
  return (
    <div className="flex flex-col w-full">
      <InputLabel value="Test Campaign" />
      <div className="flex items-center justify-between w-full gap-4 mt-2">
        <TextInput placeholder="Write a email" className="w-full" />
        <TertiaryButton isBigger>Send</TertiaryButton>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <div className="flex gap-2">
          <span className="font-bold text-white">From:</span>
          <span>{templates[0]?.user?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">To:</span>
          <span>
            <div className="py-4 text-sm font-bold text-white bg-accent-blue-dark badge">{`${selectedList?.subscribers.length} subscribers`}</div>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Subject:</span>
          <span>{data?.subject}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Content:</span>
          <span>
            <div className="py-4 text-sm font-bold text-white bg-accent-purple-dark badge">{`${selectedList?.subscribers.length} subscribers`}</div>
          </span>
        </div>
        <div className="flex items-start gap-3 mt-6">
          <span className="font-bold text-white">Send:</span>
          <div className="flex flex-col">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.track_open}
                onChange={() => setData('track_open', !data.track_open)}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Someone open the email
              </span>
            </label>
            <label className="flex items-center mt-2">
              <Checkbox
                name="remember"
                checked={data.track_open}
                onChange={() => setData('track_open', !data.track_open)}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Someone open the email
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
