export interface ApiResponse<T = any> {
  data: T;
  status: number;
}
  
  export interface ApiError {
  message: string;
  status: number;
}
  
export function isApiError(error: any): error is ApiError {
  return error && typeof error.message === 'string' && typeof error.status === 'number';
}
