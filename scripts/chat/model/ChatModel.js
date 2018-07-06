const util = require('../../util/deepFreeze.js')

class ChatModel {

    constructor(){
    }
    static get EventsType(){
        return _EventsType;
    }

    static get SocketEventsType(){
        return _SocketEventsType;
    }
}

const _EventsType = {
    ChatMessage : "ChatMessage",
    UsersChange : {
        NewUser: "NewUser",
        UserExited: "UserExited",
        UserExiting: "UserExiting"
    }
};
util.deepFreeze(_EventsType);


const _SocketEventsType = {
    connection : "connection",
    disconnect : "disconnect"
};
util.deepFreeze(_SocketEventsType);

module.exports = ChatModel;