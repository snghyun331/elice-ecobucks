/*  사용 예시
const badRequestError = setError("Bad Request", 400, 'BAD_REQUEST');
const unauthorizedError = setError("Unauthorized", 401, 'UNAUTHORIZED');
const forbiddenError = setError("Forbidden", 403, 'FORBIDDEN');
const notFoundError = setError("Not Found", 404, 'NOT_FOUND');
const internalServerError = setError("Internal Server Error", 500, 'INTERNAL_SERVER_ERROR');
*/

function setError(message, status, errorCode) {
  const error = new Error(message);
  error.status = status;
  error.errorCode = errorCode;
  return error;
}

// handleError defalt 값 : "Internal Server Error", 500, "INTERNAL_SERVER_ERROR"
// error.status, error.errorCode가 있으면 그 값으로 갱신해서 error를 생성
function handleError(error){  
  let message = "Internal Server Error"
  let status = 500
  let errorCode = "INTERNAL_SERVER_ERROR"
  // 다른 status, errorCode들 있을때 그 값으로 갱신
  if (error.status && error.errorCode) { 
    message = error.message;
    status = error.status;
    errorCode = error.errorCode;
  }

  return setError(message, status, errorCode);
}

export { setError, handleError }

