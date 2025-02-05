import InputLabel from '@/Components/InputLabel';
import TertiaryButton from '@/Components/TertiaryButton';
import TextInput from '@/Components/TextInput';
import { TemplateProps } from '@/types/template';
import { DataProps, FormErrors } from '../Form';
import Checkbox from '@/Components/Checkbox';
import { EmailListProps } from '@/types/emailList';
import { FormEventHandler, useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { handleReqError } from '@/utils/handleReqError';

type CampaignStep1Props = {
  data: DataProps;
  selectedList: EmailListProps | null;
  selectedTemplate: TemplateProps | null;
  setData: (key: string, value: any) => void;
  errors: FormErrors;
};

export default function Step3({
  data,
  selectedList,
  selectedTemplate,
  errors,
  setData
}: CampaignStep1Props) {
  const [date, setDate] = useState('');

  const [time, setTime] = useState('');

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const url = route('campaign.test.email');

      const payload = {
        email,
        subject: data.subject,
        body: data.body
      };

      const response = await axios({
        method: 'post',
        url,
        data: payload
      });

      if (response?.data?.message) {
        notyf?.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        notyf?.error(error.response.data.message);
      } else {
        handleReqError(error);
      }
    }
  };

  function InfoRow({
    label,
    value
  }: {
    label: string;
    value: string | JSX.Element;
  }) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-white">{label}:</span>
        <span>{value}</span>
      </div>
    );
  }

  useEffect(() => {
    if (data.send_at) {
      const parsedDate = new Date(data.send_at);

      if (!isNaN(parsedDate.getTime())) {
        const dateString = parsedDate.toISOString();

        setDate(dateString.split('T')[0]);
        setTime(dateString.split('T')[1].slice(0, 5));
      }
    }
  }, []);

  useEffect(() => {
    async function fetchEnvVariables() {
      try {
        const response = await axios.get('/env-variables');

        setEmail(response.data.MAIL_FROM_ADDRESS);
        setName(response.data.MAIL_FROM_NAME);
      } catch (error) {
        console.error('Erro ao carregar variáveis de ambiente:', error);
      }
    }

    fetchEnvVariables();
  }, []);

  useEffect(() => {
    if (data.customize_send_at === true) {
      setDate('');
      setTime('');
    }
  }, [data.customize_send_at]);

  return (
    <div className="flex flex-col w-full">
      <InputLabel value="Test Campaign" />

      <div className="flex flex-col items-center justify-between w-full gap-4 mt-2 lg:flex-row">
        <TextInput
          placeholder="Write an email"
          value={email}
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TertiaryButton
          onClick={submit}
          className="lg:w-[5rem] w-full"
          isBigger
        >
          Send
        </TertiaryButton>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <InfoRow label="From" value={name || 'N/A'} />
        <InfoRow
          label="To"
          value={
            <div className="py-4 text-sm font-bold text-white border-none bg-accent-blue-dark badge">
              {`${selectedList?.subscribers.length || 0} subscribers`}
            </div>
          }
        />
        <InfoRow label="Subject" value={data?.subject || '-'} />
        <InfoRow
          label="Content"
          value={
            <div className="py-4 text-sm font-bold text-white border-none bg-accent-purple-dark badge">
              {`${selectedTemplate?.name || '-'}`}
            </div>
          }
        />

        <div className="flex items-start gap-3 mt-6">
          <span className="font-bold text-white">Send:</span>
          <div className="flex flex-col">
            <label className="flex items-center">
              <Checkbox
                name="send_at"
                checked={data.customize_send_at === false}
                onChange={() => {
                  setDate('');
                  setTime('');
                  setData('send_at', new Date());
                  setData('customize_send_at', false);
                }}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Now
              </span>
            </label>
            <label className="flex items-center mt-2">
              <Checkbox
                name="send_at"
                checked={data.customize_send_at === true}
                onChange={() => {
                  setData('customize_send_at', true);
                  setData('send_at', null);
                }}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Schedule email
              </span>
            </label>
            {data.customize_send_at && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center gap-3 mt-4 lg:flex-row">
                  <input
                    type="date"
                    value={date}
                    placeholder="Select Date"
                    onChange={(e) => {
                      const date = e.target.value;

                      setDate(date);

                      if (date?.length && time?.length) {
                        const datetime = new Date(`${date}T${time}:00`);
                        setData('send_at', datetime);
                      }
                    }}
                    className="w-[10rem] border-none rounded-lg focus:outline-none focus:ring-2 disabled:cursor-not-allowed bg-background-tertiary focus:border-transparent focus:ring-gray-500"
                  />
                  <input
                    type="time"
                    placeholder="Select Hour"
                    value={time}
                    onChange={(e) => {
                      const time = e.target.value;

                      setTime(time);

                      if (date?.length && time?.length) {
                        const datetime = new Date(`${date}T${time}:00`);
                        setData('send_at', datetime);
                      }
                    }}
                    className="w-[10rem] border-none rounded-lg focus:outline-none focus:ring-2 disabled:cursor-not-allowed bg-background-tertiary focus:border-transparent focus:ring-gray-500"
                  />
                </div>
                <InputError className="mt-2" message={errors.send_at} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
