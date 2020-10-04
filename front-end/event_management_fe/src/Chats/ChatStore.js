import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();



const initState ={
    '#general':[
        {from : 'Slesh',msg : 'How are you?'},
        {from : 'Andre',msg : 'Grapee'},
        {from : 'Slesh',msg : 'Okay'}
    ],
    '#photography':[
        {from : 'Slesh',msg : 'How are you?'},
        {from : 'meow',msg : 'yesh ok'},
        {from : 'Slesh',msg : 'Okay'}
    ]
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

function sendChatAction(socket , value){
    socket.emit('chat message', value);
}

let socket;

export default function ChatStore(props) {
        
        if(!socket){
            socket = io(':3005')
        }
        const reducerHook = React.useReducer(reducer,initState)

        return (
            <CTX.Provider value={reducerHook}>
                {props.children}
            </CTX.Provider>
        )
}


