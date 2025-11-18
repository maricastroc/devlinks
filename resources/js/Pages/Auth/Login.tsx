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
import { useState, useEffect } from 'react';
import { AccountSection } from './partials/AccountSection';
import { FormHeader } from './partials/FormHeader';

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

  const [announceLoading, setAnnounceLoading] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setAnnounceLoading(true);
    } else {
      const timer = setTimeout(() => setAnnounceLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

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

      {announceLoading && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Logging in, please wait...
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 py-6 md:p-3"
        aria-labelledby="login-title"
        noValidate
      >
        <FormHeader
          title="Login"
          description="Add your details below to get back into the app"
        />

        <div className="space-y-6">
          <div>
            <InputLabel htmlFor="email" value="Email address" />
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

          <div>
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
        </div>

        <AccountSection
          linkPath={route('register')}
          text="Don't have an account?"
          linkText="Create account"
          isSubmitting={isSubmitting}
        />
      </form>
    </GuestLayout>
  );
}
