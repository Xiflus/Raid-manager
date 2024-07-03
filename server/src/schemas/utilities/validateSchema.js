const validateSchema = async (schema, data) => {
	try {
		await schema.validateAsync(data);
	} catch (err) {
		throw err;
	}
};

export default validateSchema;
