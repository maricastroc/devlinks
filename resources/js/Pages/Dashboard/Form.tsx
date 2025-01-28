import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import TertiaryButton from '@/Components/TertiaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { notyf } from '@/libs/notyf';
import axios from 'axios';
import { EmailListProps } from '@/types/emailList';
import { Inertia } from '@inertiajs/inertia';
import { CampaignProps } from '@/types/campaign';
import { TemplateProps } from '@/types/template';
import { StepButton } from './Partials/StepButton';
import Step1 from './Partials/Step1';
import Step2 from './Partials/Step2';
import Step3 from './Partials/Step3';
import { handleReqError } from '@/utils/handleReqError';
import { formatDate } from '@/utils/formatDate';
import PrimaryButton from '@/Components/PrimaryButton';

export type FormErrors = {
  name?: string;
  subject?: string;
  body?: string;
  track_click?: string;
  track_open?: string;
  send_at?: string;
  email_list_id?: string;
  template_id?: string;
};

type Props = {
  campaign?: CampaignProps;
  emailLists: EmailListProps[];
  templates: TemplateProps[];
  isEdit: boolean;
};

export type DataProps = {
  name?: string;
  subject?: string;
  body?: string;
  track_click?: boolean;
  track_open?: boolean;
  send_at?: Date | undefined;
  template_id?: number | null;
  email_list_id?: number | null;
  customize_send_at?: boolean;
};

export default function CampaignForm({
  campaign,
  emailLists,
  templates,
}: Props) {
  const [errors, setErrors] = useState<FormErrors>({});

  const [step, setStep] = useState(1);

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateProps | null>(null);

  const [selectedList, setSelectedList] = useState<EmailListProps | null>(null);

  const [processing, setProcessing] = useState(false);

  const { data, setData } = useForm({
    name: campaign?.name || undefined,
    subject: campaign?.subject || undefined,
    body: campaign?.body || undefined,
    track_click: campaign?.track_click || false,
    track_open: campaign?.track_open || false,
    send_at: campaign?.send_at || new Date(),
    template_id: campaign?.template_id || null,
    email_list_id: campaign?.email_list_id || null,
    customize_send_at: campaign?.customize_send_at || false
  });

  const handleSubmit = async (isDraft: boolean) => {
    setProcessing(true);
    setErrors({});

    try {
      const url = campaign
        ? route('campaigns.update', campaign.id)
        : route('campaigns.store');

      const payload = {
        ...data,
        _method: campaign ? 'PUT' : 'POST',
        step,
        send_at: formatDate(data.send_at),
        draft_mode: isDraft
      };

      const response = await axios({
        method: campaign ? 'put' : 'post',
        url,
        data: payload
      });

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });

        Inertia.visit(route('dashboard'));
      }

      if (!response.data.errors && step < 3) {
        setStep(step + 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        notyf?.error(error.response.data.message);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (campaign) {
      const selectedList = emailLists?.find((list) => {
        return list.id === Number(campaign.email_list_id);
      });

      setSelectedList(selectedList || null);

      const selectedTemplate = templates?.find((template) => {
        return template.id === Number(campaign.template_id);
      });

      setSelectedTemplate(selectedTemplate || null);
    }
  });

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Campaigns - {campaign ? 'Edit' : 'Create'}
        </h2>
      }
    >
      <div className="flex flex-col pb-12 mt-10 lg:pb-0">
        <Link
          href={route('dashboard')}
          className="mt-10 mb-2 ml-1 text-xs text-gray-400 lg:mt-0"
        >
          {`Campaigns > `}
          <Link
            href={
              campaign
                ? route('campaigns.edit', { campaign: campaign?.id })
                : route('campaigns.create')
            }
            className="text-gray-200"
          >
            {campaign ? 'Edit' : 'Create'}
          </Link>
        </Link>

        <section
          className={`p-5 mb-10 lg:mb-16 overflow-y-auto py-7 lg:p-8 w-[90vw] rounded-xl bg-background-secondary lg:w-[50rem] max-w-[50rem]`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(false);
            }}
            className="space-y-6 "
          >
            <div className="flex items-start mb-10 steps">
              {['Settings', 'Body (HTML)', 'Dispatch'].map((label, index) => (
                <StepButton
                  key={label}
                  label={label}
                  step={index + 1}
                  currentStep={step}
                  isActive={step === index + 1}
                  onClick={() => setStep(index + 1)}
                />
              ))}
            </div>
            {step === 1 && (
              <Step1
                data={data}
                templates={templates}
                emailLists={emailLists}
                errors={errors}
                processing={processing}
                setData={setData}
                selectList={(list: EmailListProps | null) =>
                  setSelectedList(list)
                }
                selectTemplate={(template: TemplateProps | null) =>
                  setSelectedTemplate(template)
                }
              />
            )}

            {step === 2 && (
              <Step2
                selectedTemplate={selectedTemplate}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
              />
            )}

            {step === 3 && (
              <Step3
                selectedList={selectedList}
                selectedTemplate={selectedTemplate}
                data={data}
                setData={setData}
                templates={templates}
                errors={errors}
              />
            )}

            <div className="flex flex-col-reverse items-center justify-between w-full gap-4 pt-8 lg:gap-0 lg:flex-row">
              <SecondaryButton
                className="lg:w-[7rem] w-full"
                onClick={() => {
                  step === 1
                    ? router.get(route('dashboard'))
                    : setStep(step - 1);
                }}
                disabled={processing}
              >
                Go back
              </SecondaryButton>
              <div className="flex flex-col-reverse items-center w-full gap-4 lg:w-auto lg:flex-row">
                <TertiaryButton
                  disabled={processing}
                  className="py-3 lg:py-2 lg:w-[7.5rem] w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(true);
                  }}
                >
                  {`${step === 3 ? 'Save Draft' : 'Next step'}`}
                </TertiaryButton>
                {step === 3 && (
                  <PrimaryButton
                    className="lg:w-[11rem] w-full py-3 lg:py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(false);
                    }}
                  >
                    Launch Campaign
                  </PrimaryButton>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
