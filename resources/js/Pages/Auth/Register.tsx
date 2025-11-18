import { Head, router } from '@inertiajs/react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputLabel from '@/Components/Core/InputLabel';
import TextInput from '@/Components/Core/TextInput';
import { FormError } from '@/Components/Core/FormError';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailIcon from '/public/assets/images/icon-email.svg';
import PasswordIcon from '/public/assets/images/icon-password.svg';
import toast from 'react-hot-toast';
import { AccountSection } from './partials/AccountSection';
import { FormHeader } from './partials/FormHeader';
import { useEffect, useState } from 'react';

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

const handleFormErrors = (errors: Record<string, string>) => {
  Object.values(errors).forEach((errorMessage) => {
    toast.error(errorMessage);
  });
};

export default function Register() {
  const [announceLoading, setAnnounceLoading] = useState(false);

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

  useEffect(() => {
    if (isSubmitting) {
      setAnnounceLoading(true);
    } else {
      const timer = setTimeout(() => setAnnounceLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  return (
    <GuestLayout>
      <Head title="Register" />

      {announceLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Registering user, please wait...
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 py-6 md:p-4"
        aria-labelledby="register-title"
        noValidate
      >
        <div>
          <FormHeader
            title="Create account"
            description="Let’s get you started sharing your links!"
          />

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
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...field}
              />
            )}
          />
          <FormError
            id="email-error"
            error={errors.email?.message}
            className="mt-2"
          />
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
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                {...field}
              />
            )}
          />
          <FormError
            id="password-error"
            error={errors.password?.message}
            className="mt-2"
          />
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
                aria-required="true"
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? 'username-error' : undefined
                }
                {...field}
              />
            )}
          />
          <FormError
            id="username-error"
            error={errors.username?.message}
            className="mt-2"
          />
        </div>

        <AccountSection
          linkPath={route('login')}
          text="Already have an account?"
          linkText="Login"
          isSubmitting={isSubmitting}
        />
      </form>
    </GuestLayout>
  );
}
