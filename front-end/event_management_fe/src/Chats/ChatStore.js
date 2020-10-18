import React from 'react'
import io from 'socket.io-client'
import {getUserName } from "../Login/JwtConfig";

export const CTX = React.createContext();



const initState ={
    '#General':[
        {from : 'Slesh',msg : 'How are you?'},
        {from : 'Andre',msg : 'Grapee'},
        {from : 'Slesh',msg : 'Okay'}
    ],
    '#Photography':[
        {from : 'Slesh',msg : 'How are you?'},
        {from : 'meow',msg : 'yesh ok'},
        {from : 'Slesh',msg : 'Okay'}
    ],
    '#ExamPrep':[]
}

//help remember previous state given that the current state is displaying well

function reducer(state, action){
    const{from,msg,topic}= action.payload
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                [topic]:[
                    ...state[topic],
                    {from,msg}
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}

export default function ChatStore(props) {
        
    const [allChats,dispatch] = React.useReducer(reducer,initState)

    React.useEffect(() => {
        if(!socket){
            socket = io(':3012')
            socket.on('chat message', function(msg){
                // console.log(msg)
                dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
              });    
        }
    })

        //make users, connect with user whos logged in 

        // const user = `andre${Math.random(100).toFixed(2)}`;
        const user = getUserName()


        return (
            <CTX.Provider value={{allChats,sendChatAction,user}}>
                {props.children}
            </CTX.Provider>
        )
}


