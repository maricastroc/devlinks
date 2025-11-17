import { Head, Link, router } from '@inertiajs/react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import { FormError } from '@/Components/Core/FormError';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailIcon from '/public/assets/images/icon-email.svg';
import PasswordIcon from '/public/assets/images/icon-password.svg';
import toast from 'react-hot-toast';

const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required')
});

type SignInFormData = z.infer<typeof signInFormSchema>;

const handleFormErrors = (errors: Record<string, string>) => {
  Object.values(errors).forEach((errorMessage) => {
    toast.error(errorMessage);
  });
};

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
    router.post(route('login'), data, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Welcome to Devlinks!');
      },
      onError: (errors) => {
        handleFormErrors(errors);
      }
    });
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
                autoComplete="email"
                icon={EmailIcon}
                hasError={!!errors?.email}
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
                placeholder="Enter your password"
                className="block w-full mt-1"
                icon={PasswordIcon}
                autoComplete="current-password"
                hasError={!!errors?.password}
                {...field}
              />
            )}
          />
          <FormError error={errors.password?.message} className="mt-2" />
        </div>

        <div className="flex flex-col items-center justify-end mt-6 text-center">
          <PrimaryButton disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </PrimaryButton>
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
