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

const signUpFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  username: z
    .string()
    .min(3, 'Username must have at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscores'
    )
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

// Função utilitária reutilizável
const handleFormErrors = (errors: Record<string, string>) => {
  Object.values(errors).forEach((errorMessage) => {
    toast.error(errorMessage);
  });
};

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: ''
    }
  });

  const onSubmit = async (data: SignUpFormData) => {
    router.post(route('register'), data, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('User successfully registered!');
      },
      onError: (errors) => {
        handleFormErrors(errors);
      }
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={handleSubmit(onSubmit)} className="p-2 py-6 md:p-4">
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
                placeholder="At least 8 characters"
                className="block w-full mt-1"
                icon={PasswordIcon}
                autoComplete="new-password"
                hasError={!!errors?.password}
                {...field}
              />
            )}
          />
          <FormError error={errors.password?.message} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="username" value="URL for your devlinks" />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                prefix="devlinks/"
                id="username"
                type="text"
                placeholder="username"
                className="block w-full mt-1"
                autoComplete="username"
                hasError={!!errors?.username}
                {...field}
              />
            )}
          />
          <FormError error={errors.username?.message} className="mt-2" />
        </div>

        <div className="flex flex-col items-center justify-end mt-6 text-center">
          <PrimaryButton disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </PrimaryButton>
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
