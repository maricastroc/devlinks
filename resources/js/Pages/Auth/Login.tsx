import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import EmailIcon from '/public/assets/images/icon-email.svg';
import PasswordIcon from '/public/assets/images/icon-password.svg';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password')
    });
  };

  return (
    <GuestLayout showRedirectContainer>
      <Head title="Log in" />
      <form className='p-2 py-6 md:p-4' onSubmit={submit}>
        <div>
        <h2 className='mb-2 text-[1.7rem] md:text-[2rem] font-bold text-gray-950'>Login</h2>
        <p className='mb-8 text-medium-gray'>Add your details below to get back into the app</p>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            placeholder="Your email here"
            className="block w-full mt-1"
            autoComplete="username"
            icon={EmailIcon}
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
            hasError={errors?.email !== undefined}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="Your password here"
            value={data.password}
            className="block w-full mt-1"
            icon={PasswordIcon}
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
            hasError={errors?.password !== undefined}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex flex-col items-center justify-end mt-6 text-center">
          <PrimaryButton disabled={processing}>
            Log in
          </PrimaryButton>
          <div className='flex flex-col items-center mt-6 md:mt-4 md:gap-1 md:flex-row'>
            <p className='text-md text-medium-gray'>Don't have an account?</p>
            <Link href={route('register')} className='transition-all hover:text-purple-hover duration-125 text-medium-purple text-md'>Create Account</Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
