import { DataProps, FormErrors } from "@/Pages/Dashboard/Form";

function isValidStep1(data: DataProps, errors: FormErrors): boolean {
  return (
    data.template_id !== null &&
    data.email_list_id !== null &&
    data.name !== '' &&
    data.subject !== '' &&
    !errors.name &&
    !errors.subject &&
    !errors.track_click &&
    !errors.track_open &&
    !errors.email_list_id 
  );
}

function isValidStep2(data: DataProps, errors: FormErrors): boolean {
  return isValidStep1(data, errors)
}

function isValidStep3(data: DataProps, errors: FormErrors): boolean {
  return (
    isValidStep1(data, errors) && data?.body !== undefined && !errors.body
  );
}

export function checkSteps(step: number, data: DataProps, errors: FormErrors): boolean {
  if (step === 1) {
    return isValidStep1(data, errors);
  }
  if (step === 2) {
    return isValidStep2(data, errors);
  }
  if (step === 3) {
    return isValidStep3(data, errors);
  }
  return false;
}