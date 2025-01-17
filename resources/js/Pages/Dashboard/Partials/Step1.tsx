import { FormField } from '@/Components/FormField'
import { EmailListProps } from '@/types/emailList'
import { DataProps, FormErrors } from '../Form'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import Checkbox from '@/Components/Checkbox'
import { TemplateProps } from '@/types/template'

type CampaignStep1Props = {
  data: DataProps
  setData: (key: string, value: any) => void
  emailLists: EmailListProps[]
  errors: FormErrors
  processing: boolean
  selectList: (list: EmailListProps | null) => void
  selectTemplate: (template: TemplateProps | null) => void
  templates: TemplateProps[]
}

export default function Step1({
  data,
  setData,
  emailLists,
  templates,
  errors,
  processing,
  selectList,
  selectTemplate,
}: CampaignStep1Props) {
  return (
    <>
      <FormField
        label="Name"
        id="name"
        placeholder="Choose a name for your campaign"
        value={data.name || ''}
        onChange={(e) => setData('name', e.target.value)}
        error={errors.name}
        disabled={processing}
      />

      <FormField
        label="Subject"
        id="subject"
        placeholder="Write your campaign's subject"
        value={data.subject || ''}
        onChange={(e) => setData('subject', e.target.value)}
        error={errors.subject}
        disabled={processing}
      />

      <div>
        <InputLabel htmlFor="email_list_id" value="List" />
        <SelectInput
          id="email_list_id"
          name="email_list_id"
          emailLists={emailLists}
          value={data.email_list_id || ''}
          onChange={(e) => {
            setData('email_list_id', e.target.value)
            const selectedList = emailLists.find((list) => {
              return list.id === Number(e.target.value)
            })

            selectList(selectedList || null)
          }}
        />
        <InputError className="mt-2" message={errors.email_list_id} />
      </div>

      <div>
        <InputLabel htmlFor="template_id" value="Template" />
        <SelectInput
          id="template_id"
          name="template_id"
          templates={templates}
          value={data.template_id || ''}
          onChange={(e) => {
            setData('template_id', e.target.value)

            const selectedTemplate = templates.find((template) => {
              return template.id === Number(e.target.value)
            })

            selectTemplate(selectedTemplate || null)
          }}
        />
        <InputError className="mt-2" message={errors.template_id} />
      </div>

      <div className="flex flex-col mt-7">
        <InputLabel value="Track email when:" />
        <label className="flex items-center mt-3">
          <Checkbox
            name="remember"
            size={16}
            checked={data.track_click}
            onChange={() => setData('track_click', !data.track_click)}
          />
          <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
            Someone clicks on some link
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
    </>
  )
}
