import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();



const initState ={
    '#general':[
        // {from : 'Slesh',msg : 'How are you?'},
        // {from : 'Andre',msg : 'Grapee'},
        // {from : 'Slesh',msg : 'Okay'}
    ],
    '#photography':[
        // {from : 'Slesh',msg : 'How are you?'},
        // {from : 'meow',msg : 'yesh ok'},
        // {from : 'Slesh',msg : 'Okay'}
    ],
    '#exam_prep':[]
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
            socket = io(':3008')
            socket.on('chat message', function(msg){
                console.log(msg)
                dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
              });    
        }
    })

        //make users, connect with user whos logged in 

        const user = `andre${Math.random(100).toFixed(2)}`;


        return (
            <CTX.Provider value={{allChats,sendChatAction,user}}>
                {props.children}
            </CTX.Provider>
        )
}


