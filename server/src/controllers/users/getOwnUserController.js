import { selectUserbyIdModel } from "../../models/users/index.js";
const getOwnUserController = async (req,res,next)=>{
    try {
        const userId = req.user.id;
        const {id,email,avatar,username} = await selectUserbyIdModel(userId);
        const user = {id,email,avatar,username};
        res.send({
            status:'ok',
            data:{
                user
            }
        })
    } catch (err) {
        next(err);
    }
}

export default getOwnUserController;