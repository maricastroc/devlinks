import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import TertiaryButton from '@/Components/TertiaryButton';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { notyf } from '@/libs/notyf';
import axios, { AxiosError } from 'axios';
import { EmailListProps } from '@/types/emailList';
import { Inertia } from '@inertiajs/inertia';
import Form from '@/Layouts/FormLayout';
import { handleReqError } from '@/utils/handleReqError';
import { FormField } from '@/Components/FormField';

type FormErrors = {
  title?: string;
  listFile?: string;
};

type Props = {
  emailList?: EmailListProps;
};

export default function ListForm({ emailList }: Props) {
  const [errors, setErrors] = useState<FormErrors>({});

  const [processing, setProcessing] = useState(false);

  const { data, setData } = useForm({
    title: emailList?.title || '',
    listFile: null as File | null
  });

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    setProcessing(true);
    setErrors({});

    const formData = new FormData();

    formData.append('title', data.title);

    if (data.listFile) {
      formData.append('listFile', data.listFile);
    }

    try {
      const url = emailList
        ? route('lists.update', emailList?.id)
        : route('lists.store');

      const method = emailList ? 'PUT' : 'POST';
      formData.append('_method', method);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });
      }

      Inertia.visit(route('lists.index'));
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists - {emailList ? 'Edit' : 'Create'}
        </h2>
      }
    >
      <div className="flex flex-col pb-12 lg:pb-0">
        <Link
          href={route('lists.index')}
          className="mt-10 mb-2 ml-1 text-xs text-gray-400"
        >
          {`Lists > `}
          <Link
            href={
              emailList
                ? route('lists.edit', { list: emailList.id })
                : route('lists.create')
            }
            className="text-gray-200"
          >
            {emailList ? 'Edit' : 'Create'}
          </Link>
        </Link>

        <Form onSubmit={submit}>
          <FormField
            label="Title"
            id="title"
            placeholder="Choose a title for your list"
            value={data.title || ''}
            disabled={processing}
            onChange={(e) => setData('title', e.target.value)}
            autoComplete="title"
            error={errors.title}
          />

          {!emailList && (
            <div>
              <InputLabel htmlFor="listFile" value="E-mails List" />
              <input
                id="listFile"
                name="listFile"
                disabled={processing}
                type="file"
                className="w-full mt-2 duration-200 ease-in-out file:bg-zinc-700 bg-background-tertiary text-slate-500 file-input file:cursor-pointer file:text-sm file:font-semibold file:text-gray-100 hover:file:bg-background-primary"
                accept=".csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setData('listFile', e.target.files[0]);
                  }
                }}
              />
              <InputError className="mt-2" message={errors.listFile} />
            </div>
          )}

          <div className="flex items-center justify-end gap-4">
            <SecondaryButton
              onClick={() => (window.location.href = '/lists')}
              disabled={processing}
            >
              Go back
            </SecondaryButton>
            <TertiaryButton disabled={processing}>
              {emailList ? 'Save Changes' : 'Save List'}
            </TertiaryButton>
          </div>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
}
