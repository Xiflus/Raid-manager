export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${resource}' no existe`,
    };
};

export const guildlALreadyRegisterError = (resource) => {
    throw {
        httpStatus: 409, // Not Created
        code: 'GUILD_ALREADY_CREATED',
        message: `La hermandad '${resource}' ya está creada.`,
    };
}