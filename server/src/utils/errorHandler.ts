interface CustomError extends Error {
  statusCode: number;
}

const errorHandler = (statusCode: number, message: string) => {
  const errorMessage = new Error(message) as CustomError;
  errorMessage.statusCode = statusCode;
  return errorMessage;
};

export default errorHandler;
