import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/TextInput'
import SecondaryButton from '@/Components/SecondaryButton'
import TertiaryButton from '@/Components/TertiaryButton'
import { useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'
import { notyf } from '@/libs/notyf'
import axios from 'axios'

interface CreateListErrors {
  title?: string;
  listFile?: string;
}

export default function Index() {
  const { props } = usePage();
  
  const { error, success } = props;

  const [errors, setErrors] = useState<CreateListErrors>({});

  const [processing, setProcessing] = useState(false);
  
  const { data, setData } = useForm({
    title: '',
    listFile: null as File | null,
  })

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
      const response = await axios.post(route('lists.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });
      }

      if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        notyf?.error(error.response?.data?.message || 'An error occurred.');
      }
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (success) {
      notyf?.success(success)
    } else if (error) {
      notyf?.error(error)
    }
  }, [success])

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists - Create
        </h2>
      }
    >
      <section className="p-8 w-[30rem] rounded-xl bg-background-secondary">
        <form onSubmit={submit} className="space-y-6 ">
          <div>
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              name="name"
              className="block w-full mt-1"
              placeholder="Choose a name for your list"
              value={data.title}
              disabled={processing}
              onChange={(e) => setData('title', e.target.value)}
              isFocused
              autoComplete="name"
            />

            <InputError className="mt-2" message={errors.title} />
          </div>

          <div>
            <InputLabel htmlFor="listFile" value="E-mails List" />
            <input
              id="listFile"
              name="listFile"
              disabled={processing}
              type="file"
              className="block w-full mt-2 text-sm transition-all duration-200 ease-in-out bg-transparent file:cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-background-tertiary file:text-gray-100 hover:file:bg-background-primary"
              accept=".csv"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setData('listFile', e.target.files[0]);
                }
              }}
            />
            <InputError className="mt-2" message={errors.listFile} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <SecondaryButton
              onClick={() => (window.location.href = '/lists')}
              disabled={processing}
            >
              Go back
            </SecondaryButton>
            <TertiaryButton disabled={processing}>Save List</TertiaryButton>
          </div>
        </form>
      </section>
    </AuthenticatedLayout>
  )
}
