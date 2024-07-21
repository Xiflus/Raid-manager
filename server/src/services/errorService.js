export const notFoundError = (resource) => {
	throw {
		httpStatus: 404, // Not Found
		code: "RESOURCE_NOT_FOUND",
		message: `El recurso requerido '${resource}' no existe`,
	};
};

export const guildlALreadyRegisterError = (resource) => {
	throw {
		httpStatus: 409, // Not Created
		code: "GUILD_ALREADY_CREATED",
		message: `La hermandad '${resource}' ya está creada.`,
	};
};

export const requiredFieldsError = () => {
	throw {
		httpStatus: 400,
		code: "RESOURCE_REQUIRED",
		message: "Los campos characterId y guildId son obligatorios.",
	};
};

export const invalidCredentialsError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "INVALID_CREDENTIALS",
		message: "Credenciales inválidas",
	};
};

export const pendingActivationError = () => {
	throw {
		httpStatus: 403, // Forbidden
		code: "PENDING_ACTIVATION",
		message: "Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.",
	};
};

export const saveFileError = () => {
	throw {
		httpStatus: 500, // Internal Server Error
		code: "FILE_SAVE_FAILED",
		message: "Error al guardar el archivo en el disco",
	};
};

export const deleteFileError = () => {
	throw {
		httpStatus: 409, // Conflict
		code: "FILE_DELETED_FAILED",
		message: "Error al eliminar el archivo del disco",
	};
};

export const characterNotFoundError = (resource) => {
	throw {
		httpStatus: 404, // Not Found
		code: "CHARACTER_NOT_FOUND",
		message: `El personaje '${resource}' no existe`,
	};
};

export const guildNotFoundError = (resource) => {
	throw {
		httpStatus: 404, // Not Found
		code: "GUILD_NOT_FOUND",
		message: `La hermandad '${resource}' no existe`,
	};
};

export const sendEmailError = () => {
	throw {
		httpStatus: 500, // Internal server error
		code: "SEND_EMAIL_FAILED",
		message: "Error al enviar email",
	};
};

export const emailALreadyRegisterError = () => {
	throw {
		httpStatus: 409, // conflicto
		code: "EMAIL_ALREADY_REGISTERED",
		message: "El email ya está registrado, intenta con otro!",
	};
};

export const usernameAlreadyRegisteredError = () => {
	throw {
		httpStatus: 409, // conflicto
		code: "USERNAME_ALREADY_REGISTERED",
		message: "El username ya está registrado, intenta con otro!",
	};
};

export const notAuthenticatedError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "NOT_AUTHENTICATED",
		message: `Debes enviar un token en el header 'Authorization'`,
	};
};

export const invalidTokenError = () => {
	throw {
		httpStatus: 401, // Unauthorized
		code: "INVALID_TOKEN",
		message: "Token inválido",
	};
};
export const characterAlreadyAtGuildError = () => {
	throw {
		httpStatus: 409, // conflict
		code: "CHARACTER_ALREADY_AT_GUILD",
		message: "El personaje ya pertenece a una Hermandad",
	};
};
export const characterIsNotMemberError = () => {
	throw {
		httpStatus: 409, // conflict
		code: "CHARACTER_IS_NOT_MEMBER_AT_GUILD",
		message: "El personaje no pertenece a esta Hermandad",
	};
};

export const notAuthorizedError = () => {
	throw {
		httpStatus: 401,
		code: "CHARACTER_IS_NOT_OWNER",
		message: "El personaje no es el Guild Master",
	};
};

export const characterlAlreadyRegisterError = (resource) => {
	throw {
		httpStatus: 409, // Not Created
		code: "CHARACTER_ALREADY_CREATED",
		message: `El nombre '${resource}' ya está existe.`,
	};
};

export const userCharactersNotFoundError = () => {
	throw {
		httpStatus: 404, // Not Found
		code: "USER_CHARACTERS_NOT_FOUND",
		message: "No tienes ningún personaje creado, crea uno para continuar",
	};
};

export const notStaffError = () => {
	throw {
		httpStatus: 403, // Forbidden
		code: "NOT_STAFF",
		message: "No eres oficial de la hermandad",
	};
};

// Añadir error personalizado para recoverypassCode erroneo.

export const recoveryCodeError = () => {
	throw {
		httpStatus: 400,
		code: "RECOVERY_CODE_ERROR",
		message: "El código de recuperación es incorrecto",
	};
};
