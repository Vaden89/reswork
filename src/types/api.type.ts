export interface SuccessResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ErrorResponse {
  message: string
  error: string
  success: boolean
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
