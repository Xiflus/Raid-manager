import { selectGuildByIdModel } from "../../models/guilds/index.js";
import { notAuthorizedError } from "../../services/errorService.js";
import editGuildModel from "../../models/guilds/index.js";



const editGuildController = async (req,res,next)=>{
    try {
        await validateSchema(editGuildSchema,req.body);
        let {name,description} = req.body;
        const userId = req.user?.id;
        const guildId = req.params.guildId;
        const guild = await selectGuildByIdModel(guildId)

        if (userId !== guild.owner_id) {
            notAuthorizedError()
        }

        name = name === guild.name ? null : name;
        description = description === guild.description ? null : description;

        await editGuildModel(guildId,name,description)
        res.status(201).send({
            status:"ok",
            data:{
                message:"Hermandad modificada correctamente"
            }
        })
        
    } catch (err) {
        next(err)
    }
}

export default editGuildController;