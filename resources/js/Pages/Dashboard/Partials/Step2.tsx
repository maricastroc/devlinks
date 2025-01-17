import InputError from '@/Components/InputError'
import { DataProps, FormErrors } from '../Form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type CampaignStep1Props = {
  data: DataProps
  setData: (key: string, value: any) => void
  errors: FormErrors
  processing: boolean
}

export default function Step2({ data, setData, errors, processing }: CampaignStep1Props) {
  return (
<div>

            <div spellCheck={false}>
              <ReactQuill
                value={data.body}
                onChange={(value) => setData('body', value)}
                theme="snow"
                placeholder="Your template here"
                readOnly={processing}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    [{ align: [] }],
                    ['link'],
                    [{ color: [] }, { background: [] }],
                    ['blockquote', 'image', 'code-block'],
                    ['clean'],
                  ],
                }}
                className="mt-2 text-gray-300 border-transparent rounded-md shadow-sm custom-quill disabled:cursor-not-allowed disabled:text-gray-500 bg-background-tertiary focus:border-gray-600 focus:ring-gray-600"
              />
            </div>

            <InputError className="mt-2" message={errors.body} />

            <style>{`
        .ql-toolbar.ql-snow {
          border: none !important;
        }
        .ql-container.ql-snow {
          border: none !important;
        }
        .ql-editor.ql-blank::before {
          border: none !important;
          font-style: normal !important;
          color: #52525b;
          font-size: 14px;
        }
        .ql-container.ql-snow {
          height: 200px;
        }
      `}</style>
          </div>
  )
}
