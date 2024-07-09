import type { Response } from '@/types/results'
import type { AxiosResponse } from 'axios'

export async function query<T>(req: Promise<AxiosResponse<Response<T>, any>>) {
  const { data } = await req
  return data.value
}
