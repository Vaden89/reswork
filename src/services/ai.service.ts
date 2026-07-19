import { ENDPOINTS } from '#/data/constants/endpoints'
import { authClient } from '#/lib/auth-client'
import type { ErrorResponse, SuccessResponse } from '#/types/api.type'
import { axiosPost } from '#/utils/api'

export async function refineResponsibility(payload: {
  responsibility: string
  position?: string
  company?: string
}) {
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
}
