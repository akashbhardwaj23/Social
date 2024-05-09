import User from "../models/User";

//READ


export const getUser = async (req:any,res:any) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)

        res.status(200).json(user)

    } catch (error:any) {
        res.status(404).json({ErrorMessage:error.message})
    }
}



export const getUserFriends = async (req:any, res:any) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user) return res.status(404).json({ErrorMessage:"User not found"})

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Formatting for Frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}:any) => {
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        );

        res.status(200).json(formattedFriends)
    } catch (error:any) {
        res.status(404).json({ErrorMessage:error.message})
    }
}


//UPDATE

export const addRemoveFriend = async (req:any, res:any) => {
    try {
        const{ id, friendId} = req.params
        const user = await User.findById(id)

        const  friend = await User.findById(friendId);

        if(!user || !friend) return res.status(404).json({ErrorMessage:"User not found"})

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId)

            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }

        // Provided by mongoDb
        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map (
            ({ _id, firstName, lastName, occupation, location, picturePath}:any) => {
                return { _id, firstName, lastName, occupation, location, picturePath}
            }
        )


        res.status(200).json(formattedFriends)

    } catch (error:any) {
        res.status(404).json({ErrorMessage: error.message})
    }
}