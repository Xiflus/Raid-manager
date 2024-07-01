const createGuildController = async (req, res, next) => {
    try {
        //validamos los datos con joi
        //await validateSchema(newGuilSchema, req.body)
        const {  name, avatar, description, userId } = req.body;
        await insertGuildModel(name, avatar, description, userId);
    } catch (err) {
        
    }
}