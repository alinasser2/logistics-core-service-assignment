export class ApiResponse {
  static success(data: any, message = 'Success', statusCode = 200) {
    return {
      statusCode,
      message,
      data,
    };
  }
}
