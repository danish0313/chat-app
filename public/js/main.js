
const chatform = document.getElementById('chat-form');
const socket = io();
const chatmessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const totalUser = document.getElementById('users');

// get username and room from url

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

console.log(username, room)

// join chat room

socket.emit('joinRoom', { username, room });


// total user in a room and room name
socket.on('RoomUser', ({ users }) =>
{

        Room(room);
        User(users);
})

// message from server
socket.on('message', (message) =>
{
        messageToDom(message);
        // scroll down
        chatmessage.scrollTop = chatmessage.scrollHeight;
})




// message submit  from front end
chatform.addEventListener('submit', (e) =>
{
        e.preventDefault();

        const msg = e.target.elements.msg.value;

        socket.emit('chatmessage', msg);

        // empty the input-box after send

        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
});


// message from server to html page dom

messageToDom = (message) =>
{
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
<p class="text">
       ${message.text}
</p>`;

        document.querySelector('.chat-messages').appendChild(div);

}

Room = (name) =>
{

        roomName.innerText = name;
}

User = (users) =>
{
        console.log(users.map(x => x.username))

        totalUser.innerHTML = `${users.map(x => `<li> ${x.username} </li>`).join('')}`;

}


