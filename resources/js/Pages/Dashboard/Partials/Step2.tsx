import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import { DataProps, FormErrors } from '../Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TemplateProps } from '@/types/template';
import * as Dialog from '@radix-ui/react-dialog';
import { PreviewModal } from '@/Components/PreviewModal';
import { Eye } from 'phosphor-react';
import InputLabel from '@/Components/InputLabel';

type CampaignStep1Props = {
  data: DataProps;
  setData: (key: string, value: any) => void;
  errors: FormErrors;
  processing: boolean;
  selectedTemplate: TemplateProps | null;
};

export default function Step2({
  data,
  setData,
  errors,
  processing,
  selectedTemplate
}: CampaignStep1Props) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    setData('body', data.body || selectedTemplate?.body);
  }, []);

  return (
    <div>
      <div spellCheck={false}>
        <div className="flex items-center justify-between">
          <InputLabel htmlFor="body" value="Body (HTML)" />
          <Dialog.Root open={isPreviewModalOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="flex items-center gap-2 text-sm text-gray-200 transition-all duration-150 hover:text-white"
              >
                <Eye size={15} /> Preview
              </button>
            </Dialog.Trigger>
            <PreviewModal
              closeModal={() => setIsPreviewModalOpen(false)}
              data={data.body || ''}
            />
          </Dialog.Root>
        </div>
        <ReactQuill
          value={data.body || ''}
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
              [{ separator: 'divider' }]
            ]
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
  );
}
