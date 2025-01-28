import { notyf } from '@/libs/notyf';
import axios from 'axios';

export function handleReqError(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    let errorMessage = 'Ooops, something went wrong. Please try again later.';

    console.log(error.response);

    if (typeof error.response.data.message === 'string') {
      errorMessage = error.response.data.message;
    } else if (
      error.response.data.message &&
      typeof error.response.data.message === 'object'
    ) {
      errorMessage = Object.values(error.response.data.message).join(', ');
    }

    notyf?.error(errorMessage);
  } else {
    notyf?.error('Ooops, something went wrong. Please try again later.');
    console.log(error);
  }
}
