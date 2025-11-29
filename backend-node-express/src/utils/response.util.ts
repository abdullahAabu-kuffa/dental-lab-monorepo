// TODO: Response Formatting Utility
// Purpose: Standardize API response format
// Usage: Use in all route handlers for consistent responses
// Responsibility: Format success responses, error responses, paginated responses

interface SuccessResponse {
  status: 'success';
  message?: string;
  data: any;
}

interface ErrorResponse {
  status: 'error';
  message: string;
  statusCode: number;
  error?: any;
}

export function successResponse(data: any, message?: string): SuccessResponse {
  return {
    status: 'success',
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  statusCode: number,
  error?: any
): ErrorResponse {
  return {
    status: 'error',
    message,
    statusCode,
    error,
  };
}

// usage example:
// export async function exampleController(req, res) {
//   try {
//     const data = await someService.getData();
//     return res.json(successResponse(data, 'Data fetched successfully'));
//   } catch (error) {
//     return res
//       .status(500)
//       .json(errorResponse('Failed to fetch data', 500, error.message));
//   }
// }