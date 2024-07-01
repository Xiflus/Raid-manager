import { notFoundError } from '../../services/errorService.js';

// Función controladora final del middleware de ruta no encontrada.
const notFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

export default notFoundController;