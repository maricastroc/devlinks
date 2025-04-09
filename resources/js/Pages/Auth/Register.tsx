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
import UserIcon from '/public/assets/images/icon-user-circle.svg';
import { UserCircle } from 'phosphor-react';

const signUpFormSchema = z.object({
  email: z.string().min(3, { message: 'E-mail is required.' }),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' }),
  username: z
    .string()
    .min(8, { message: 'Username must have at least 3 characters' })
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '', username: '' }
  });

  const onSubmit = async (data: SignUpFormData) => {
    router.visit(route('register'), {
      method: 'post',
      data,
      preserveScroll: true,
      onSuccess: () => {
        notyf?.success('User successfully registered!');
      },
      onError: (errors) => {
        Object.values(errors).forEach((errorMessage) => {
          notyf?.error(errorMessage);
        });
      }
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 py-6 md:p-4 lg:max-h-[78vh] overflow-scroll"
      >
        <div>
          <h2 className="mb-2 text-[1.7rem] md:text-[2rem] font-bold text-dark-gray">
            Create account
          </h2>
          <p className="mb-8 text-medium-gray">
            Let’s get you started sharing your links!
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

        <div className="mt-4">
          <InputLabel htmlFor="username" value="Username" />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                id="username"
                type="text"
                placeholder="At least 3 characters"
                className="block w-full mt-1"
                icon={UserIcon}
                autoComplete="current-password"
                hasError={errors?.username !== undefined}
                {...field}
              />
            )}
          />
          <FormError
            error={
              errors.username?.message &&
              'Username must have at least 3 characters'
            }
            className="mt-2"
          />
        </div>

        <div className="flex flex-col items-center justify-end mt-6 text-center">
          <PrimaryButton disabled={isSubmitting}>Create account</PrimaryButton>
          <div className="flex flex-col items-center mt-6 md:mt-4 md:gap-1 md:flex-row">
            <p className="text-md text-medium-gray">Already have an account?</p>
            <Link
              href={route('login')}
              className="transition-all hover:text-purple-hover duration-125 text-medium-purple text-md"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
