import selectCharacterByIdModel from "../../models/guilds/selectCharacterByIdModel";
import selectGuildByIdModel from "../../models/guilds/selectGuildByIdModel";
import {requiredFieldsError,characterNotFoundError,guildNotFoundError} from "../../services/errorService.js"
import deleteFromGuildModel from "../../models/guilds/deleteFromGuildModel.js";




const unsubscribeFromGuildController = async(req,res,next)=>{
    const {guildName,characterName} = req.body;
    if(!guildName || !characterName){
        return requiredFieldsError();
    }
    try {
        const characters = await selectCharacterByIdModel(characterName);
        const guilds = await selectGuildByIdModel(guildName);
        if (!characters || characters.length===0) {
            characterNotFoundError();
        }
        if (!guilds || guilds.length===0){
            guildNotFoundError();
        }
        const character = characters[0];
        const guild = guilds[0];


        await deleteFromGuildModel (character.id, guild.id);
        res.send({
            status:"ok",
        data:  {
            message:"Eliminado de la hermandad correctamente."
        }
        })

    } catch (err) {
        next(err)
    }
}

export default unsubscribeFromGuildController;