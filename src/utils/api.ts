import type { ApiResponse } from '#/types/api.type'
import axios from 'axios'

import type { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function axiosGet<T>(url: string): Promise<ApiResponse<T>> {
  const response = await instance.get(url)

  return response.data
}

export async function axiosPost<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await instance.post(url, data, config)

  return response.data
}
