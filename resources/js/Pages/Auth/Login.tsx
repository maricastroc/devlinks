import { Head, Link, router } from '@inertiajs/react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notyf } from '@/libs/notyf';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormError } from '@/Components/FormError';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailIcon from '/public/assets/images/icon-email.svg';
import PasswordIcon from '/public/assets/images/icon-password.svg';
import axios from 'axios';

const signInFormSchema = z.object({
  email: z.string().min(3, { message: 'E-mail is required.' }),
  password: z.string().min(3, { message: 'Password is required' })
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await axios.post(route('login'), data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true // se estiver usando cookies para autenticação
      });

      notyf?.success('Welcome to Devlinks!');
      window.location.href = route('dashboard'); // ou redireciona pra onde quiser
    } catch (error: any) {
      if (error.response && error.response.data?.errors) {
        Object.values(error.response.data.errors).forEach((msg) => {
          notyf?.error(msg as string);
        });
      } else {
        notyf?.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 py-6 md:p-3">
        <div>
          <h2 className="mb-2 text-[1.7rem] md:text-[2rem] font-bold text-dark-gray">
            Login
          </h2>
          <p className="mb-8 text-medium-gray">
            Add your details below to get back into the app
          </p>
          <InputLabel htmlFor="email" value="Email" />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                id="email"
                type="email"
                placeholder="e.g. alex@email.com"
                className="block w-full mt-1"
                autoComplete="username"
                icon={EmailIcon}
                hasError={errors?.email !== undefined}
                {...field}
              />
            )}
          />

          <FormError error={errors.email?.message} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="block w-full mt-1"
                icon={PasswordIcon}
                autoComplete="current-password"
                hasError={errors?.password !== undefined}
                {...field}
              />
            )}
          />
          <FormError error={errors.password?.message} className="mt-2" />
        </div>

        <div className="flex flex-col items-center justify-end mt-6 text-center">
          <PrimaryButton disabled={isSubmitting}>Log in</PrimaryButton>
          <div className="flex flex-col items-center mt-6 md:mt-4 md:gap-1 md:flex-row">
            <p className="text-md text-medium-gray">Don't have an account?</p>
            <Link
              href={route('register')}
              className="transition-all hover:text-purple-hover duration-125 text-medium-purple text-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
