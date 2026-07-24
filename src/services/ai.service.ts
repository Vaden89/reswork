import { ENDPOINTS } from '#/data/constants/endpoints'
import { authClient } from '#/lib/auth-client'
import type { ErrorResponse, SuccessResponse } from '#/types/api.type'
import { axiosPost } from '#/utils/api'
import type { AxiosError } from 'axios'

export async function refineResponsibility(payload: {
  responsibility: string
  position?: string
  company?: string
}) {
  try {
    const { data } = await authClient.convex.token()

    if (!data) {
      return {
        message: "You're not authenticated, please login to use ai features",
        error: 'unauthorized',
      } as ErrorResponse
    }

    const response = await axiosPost<string>(
      ENDPOINTS.REFINE_RESPONSIBILITY,
      payload,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    )

    return response
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>

    return {
      message: error.response?.data.message ?? 'Unexpected Error',
      error: error.response?.data.error ?? error.code,
      success: false,
    } as ErrorResponse
  }
}
