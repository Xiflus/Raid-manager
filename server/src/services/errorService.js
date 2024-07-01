export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${resource}' no existe`,
    };
};

export const sendEmailError = () => {
    throw {
      httpStatus: 500, // Internal server error
      code: "SEND_EMAIL_FAILED",
      message: "Error al enviar email",
    };
  };