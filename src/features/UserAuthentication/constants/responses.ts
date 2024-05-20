type ResponseType = {
  [error_code: string]: {
    code: string;
    message: string;
  };
};

const RESPONSE: ResponseType = {
  BAD_REQUEST: { code: 'BAD_REQUEST', message: 'Request Failed!' },
};

export default RESPONSE;
