const user = [];

//join suer to chat 
userJoin = (id, username, room) =>
{

        const data = { id, username, room };
        user.push(data);
        return user;
}


// get the currrent user

getUser = (id) =>
{
        return user.find(user => user.id === id);
}


// user leave the chat 
userLeave = (id) =>
{
        const index = user.findIndex(user => user.id === id)
        if (index !== -1)
        {
                return user.splice(index, 1)[0];
        }
}

// get room users 

getRoomUsers = (room) =>
{
        return user.filter(user => user.room === room)
}


module.exports = {
        userJoin,
        getUser,
        userLeave,
        getRoomUsers

}