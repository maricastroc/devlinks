// https://github.com/vercel/swr/blob/main/examples/axios-typescript/libs/useRequest.ts
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { api } from '@/libs/axios';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagination: any;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request,
    /**
     * Fetcher function to call the API
     */
    () => api.request<Data>(request!),
    {
      ...config,
      revalidateOnFocus: false,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: 'InitialData',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          config: request!,
          headers: {},
          data: fallbackData
        } as AxiosResponse<Data>)
    }
  );

  const responseData = response?.data; // Não acessar diretamente Object.values
  const pagination = response?.data; // Manter a estrutura correta

  return {
    data: responseData, // Retornar os dados completos
    response,
    error,
    isValidating,
    mutate,
    pagination
  };
}
