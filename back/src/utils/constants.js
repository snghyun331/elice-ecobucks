//--- 2xx: 성공 (Success) ---
export const OK = 200;         // 요청이 성공적으로 처리, 주로 GET 또는 PUT 요청에 사용
export const CREATED = 201;    // 요청이 성공적으로 처리되어 새로운 리소스가 생성, 주로 POST 요청에 사용
export const NO_CONTENT = 204; // 요청은 성공적이었지만 응답 본문에 보낼 데이터가 없을때, 주로 DELETE 요청에 사용

//--- 3xx: 리다이렉션 (Redirection) ---
export const FOUND = 302; // 클라이언트가 요청한 리소스가 임시로 다른 위치에 이동했을 때, 다른 URL로 임시적으로 이동

//--- 4xx: 클라이언트 오류 (Client Error) ---
export const BAD_REQUEST = 400;  // 서버가 요청을 이해하지 못했을때, 클라이언트 측에서 잘못된 요청, 데이터 누락
export const UNAUTHORIZED = 401; // 요청한 리소스를 얻기 위해 인증이 필요함을 나타냄
export const FORBIDDEN = 403;    // 클라이언트가 요청한 리소스에 대한 접근 권한이 없음
export const NOT_FOUND = 404;    // 요청한 리소스를 서버에서 찾을 수 없을때
export const CONFLICT = 409;     // 생성하려는 리소스가 이미 존재하는 경우

//--- 5xx: 서버 오류 (Server Error) ---
export const INTERNAL_SERVER_ERROR = 500; // 서버에 오류가 발생하여 요청을 처리할 수 없음


/* --- CRUD의 상태코드 주로 사용하는 경우 정리 ---
CREATE:
성공: 201 Created - 리소스가 성공적으로 생성.
실패: 400 Bad Request - 클라이언트의 요청이 잘못된 형식이거나, 필요한 데이터가 누락되었을 때 사용. 
    또는 409 Conflict - 생성하려는 리소스가 이미 존재하는 경우에 사용.

READ:
성공: 200 OK - 요청이 성공적으로 처리되었음.
실패: 404 Not Found - 요청한 리소스를 찾을 수 없는 경우에 사용.

UPDATE:
성공: 200 OK 또는 204 No Content - 리소스가 성공적으로 업데이트되었음.
실패: 400 Bad Request - 클라이언트의 요청이 잘못된 형식이거나, 필요한 데이터가 누락되었을 때 사용. 
   또는 404 Not Found - 업데이트하려는 리소스를 찾을 수 없는 경우에 사용.

DELETE:
성공: 204 No Content - 리소스가 성공적으로 삭제되었음.
실패: 404 Not Found - 삭제하려는 리소스를 찾을 수 없는 경우에 사용.
*/