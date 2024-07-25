const joiErrorMessages = {
	name: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.empty": 'El campo "{#key}" no puede estar vacío.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
	description: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.min": 'El campo "{#key}" debe tener al menos {#limit} caracteres.',
		"string.max": 'El campo "{#key}" no puede tener más de {#limit} caracteres.',
		"any.required": 'El campo "{#key}" es obligatorio.',
		"number.base": 'El valor de "{#key}" debe ser un número',
	},
	photo1: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto (URL).',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
	avatar: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto (URL de imagen).',
		"any.only": 'El campo "{#key}" debe ser una imagen en formato PNG, JPEG, o JPG.',
		"any.required": 'El campo "{#key}" es obligatorio.',
		"number.max": "El archivo no debe exceder los 5 MB",
	},
	size: {
		"number.max": 'El valor de "{#key}" no debe exceder los {#limit} bytes.',
	},
	title: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"any.required": 'El campo "{#key}" es obligatorio.',
		"object.base": 'El valor de "{#key}" debe ser un objeto',
	},
	content: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.min": 'El campo "{#key}" debe tener al menos {#limit} caracteres.',
		"string.max": 'El campo "{#key}" no puede tener más de {#limit} caracteres.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},

	currentPassword: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
	newPassword: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.pattern.base": 'El campo "{#key}" debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
	username: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.min": 'El campo "{#key}" debe tener al menos {#limit} caracteres.',
		"string.max": 'El campo "{#key}" no puede tener más de {#limit} caracteres.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
	email: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto válida.',
		"string.email": 'Debe proporcionar un correo electrónico válido para "{#key}"',
		"any.required": 'El campo "{#key}" es obligatorio.',
		"object.unknown": "No se permiten campos adicionales en este objeto",
	},
	password: {
		"string.base": 'El valor de "{#key}" debe ser una cadena de texto.',
		"string.pattern.base": 'El campo "{#key}" debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
		"any.required": 'El campo "{#key}" es obligatorio.',
		"object.unknown": "No se permiten campos adicionales en este objeto",
	},
	value: {
		"number.base": 'El valor de "{#key}" debe ser un número.',
		"number.min": 'El valor de "{#key}" no puede ser menor a {#limit}.',
		"number.max": 'El valor de "{#key}" no puede ser mayor a {#limit}.',
		"any.required": 'El campo "{#key}" es obligatorio.',
	},
};

export default joiErrorMessages;
