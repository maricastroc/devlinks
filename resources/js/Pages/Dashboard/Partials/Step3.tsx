import InputLabel from '@/Components/InputLabel';
import TertiaryButton from '@/Components/TertiaryButton';
import TextInput from '@/Components/TextInput';
import { TemplateProps } from '@/types/template';
import { DataProps, FormErrors } from '../Form';
import Checkbox from '@/Components/Checkbox';
import { EmailListProps } from '@/types/emailList';
import { useState } from 'react';
import InputError from '@/Components/InputError';

type CampaignStep1Props = {
  templates: TemplateProps[];
  data: DataProps;
  selectedList: EmailListProps | null;
  setData: (key: string, value: any) => void;
  errors: FormErrors;
};

export default function Step3({
  data,
  templates,
  selectedList,
  errors,
  setData
}: CampaignStep1Props) {
  const [scheduleEmail, setScheduleEmail] = useState(false);
  console.log(errors);
  const [date, setDate] = useState('');

  const [time, setTime] = useState('');

  const handleDateTimeChange = () => {
    if (date?.length && time?.length) {
      const datetime = new Date(`${date}T${time}:00`);
      setData('send_at', datetime);
    } else {
      setData('send_at', new Date());
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

  return (
    <div className="flex flex-col w-full">
      <InputLabel value="Test Campaign" />

      <div className="flex items-center justify-between w-full gap-4 mt-2">
        <TextInput placeholder="Write an email" className="w-full" />
        <TertiaryButton isBigger>Send</TertiaryButton>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <InfoRow label="From" value={templates[0]?.user?.email || 'N/A'} />
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
              {`${selectedList?.subscribers.length || 0} subscribers`}
            </div>
          }
        />

        <div className="flex items-start gap-3 mt-6">
          <span className="font-bold text-white">Send:</span>
          <div className="flex flex-col">
            <label className="flex items-center">
              <Checkbox
                name="send_at"
                checked={!scheduleEmail}
                onChange={() => {
                  setScheduleEmail(false);
                  setDate('');
                  setTime('');
                  handleDateTimeChange();
                }}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Now
              </span>
            </label>
            <label className="flex items-center mt-2">
              <Checkbox
                name="send_at"
                checked={scheduleEmail}
                onChange={() => setScheduleEmail(true)}
              />
              <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                Schedule email
              </span>
            </label>
            {scheduleEmail && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mt-4">
                  <input
                    type="date"
                    placeholder="Select Date"
                    onChange={(e) => {
                      setDate(e.target.value);
                      handleDateTimeChange();
                    }}
                    className="w-[10rem] border-none rounded-lg focus:outline-none focus:ring-2 disabled:cursor-not-allowed bg-background-tertiary focus:border-transparent focus:ring-gray-500"
                  />
                  <input
                    type="time"
                    placeholder="Select Hour"
                    onChange={(e) => {
                      setTime(e.target.value);
                      handleDateTimeChange();
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
