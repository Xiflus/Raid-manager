import uuid4 from "uuid4";
import selectCharacterByIdModel from "../../models/guilds/selectCharacterByIdModel.js";
import selectGuildByIdModel from "../../models/guilds/selectGuildByIdModel.js";
import joinRequestModel from "../../models/guilds/joinRequestModel.js";


const joinGuildController = async (req, res, next) => {
  const { guildName, characterName } = req.body;
  if (!characterName || !guildName) { 
    return requiredFieldsError();
  }
  try {
    const [character] = await selectCharacterByIdModel(characterName);
    const [guild] = await selectGuildByIdModel(guildName);

    console.log(character);

    const requestId = uuid4();
   /*  await insertJoinRequestModel(); */

    await joinRequestModel(requestId,character[0],guild[0]); 
    res.send({
        status:"ok",
        data:  {
            message:"solicitud para unión a guild enviada"
        }
    })
    

  } catch (err) {
    next(err);
  }
};

export default joinGuildController;