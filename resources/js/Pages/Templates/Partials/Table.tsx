import * as Dialog from '@radix-ui/react-dialog';
import { Link } from '@inertiajs/react';
import { Info, PencilSimple, TrashSimple } from 'phosphor-react';
import { TemplatesResults } from '../Index';
import { useState } from 'react';
import { DeleteModal } from '@/Components/DeleteModal';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { Inertia } from '@inertiajs/inertia';
import { handleReqError } from '@/utils/handleReqError';

type Props = {
  templates: TemplatesResults;
};

type TemplateRowProps = {
  template: TemplatesResults['data'][0];
};

const TemplateRow = ({ template }: TemplateRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const textStyle =
    template.deleted_at === null ? 'text-gray-300' : 'text-red-400';

    const handleRestore = async () => {
      try {
        const url = route('templates.restore', { id: template.id });
  
        const response = await axios({
          method: 'put',
          url,
        });
  
        if (response?.data.message) {
          await new Promise((resolve) => {
            notyf?.success(response?.data?.message);
            setTimeout(resolve, 2000);
          });
  
          Inertia.visit(route('templates.index'));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.errors) {
          notyf?.error(error.response.data.message);
        } else {
          handleReqError(error);
        }
      }
    };

  return (
    <tr key={template.id} className="border-b-zinc-800">
      <td className={`py-2 text-medium ${textStyle}`}>{template.id}</td>
      <td className={`py-2 text-medium ${textStyle}`}>{template.name}</td>
      <td className="flex items-center justify-center text-gray-300">
        {template.deleted_at === null ? (
          <div className="flex items-center gap-3">
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('templates.show', { template: template.id })}
            >
              <Info size={16} />
            </Link>
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('templates.edit', { template: template.id })}
            >
              <PencilSimple size={16} />
            </Link>
            <Dialog.Root open={isDeleteModalOpen}>
              <Dialog.Trigger asChild>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="transition-all duration-150 hover:text-red-500"
                >
                  <TrashSimple size={16} />
                </button>
              </Dialog.Trigger>
              <DeleteModal
                entity="template"
                template={template}
                closeModal={() => setIsDeleteModalOpen(false)}
              />
            </Dialog.Root>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full'>
            <button onClick={handleRestore} className="flex items-center justify-center text-xs text-gray-100 transition-all duration-150 bg-transparent border border-gray-200 hover:border-white hover:text-white badge">restore</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export function Table({ templates }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-5 lg:max-h-[45vh] overflow-auto rounded-lg lg:p-5 mt-7 bg-background-tertiary text-content">
      <table className="table overflow-y-scroll text-content table-md">
        <thead>
          <tr className="border-b-zinc-800">
            <th className="text-content text-medium w-[20%]">ID</th>
            <th className="text-content text-medium w-[45%]">Template</th>
            <th className="flex items-center justify-center text-content text-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {templates.data.map((template) => (
            <TemplateRow key={template.id} template={template} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
