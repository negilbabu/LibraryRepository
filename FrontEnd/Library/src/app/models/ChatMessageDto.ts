export class ChatMessageDto{
[x: string]: any;
    username:string;
    message:string;
    room_name:string;
    user_name:string;
    receiver_id:string;
    

    constructor(username:string,message:string,room_name:string,user_name:string,reciever_id:string){
        this.username=username;
        this.message=message;
        this.room_name=room_name;
        this.user_name=user_name;
        this.receiver_id=reciever_id;
        
    }

    
}