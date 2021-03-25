import {useReducer,useEffect,useState} from 'react'
import {apiGet} from './config';

function usePersistedReducer(reducer,initializeState,key){

    const [state,dispatch] = useReducer(reducer,initializeState,(initial)=>{

        const persistred=localStorage.getItem(key);

        return persistred ? JSON.parse(persistred) : initial;

    });

    useEffect(()=>{

        localStorage.setItem(key,JSON.stringify(state));

    },[state,key]);


    return [state,dispatch];
}

function showReducer(previous,action){
    switch(action.type){

        case 'ADD': return [...previous,action.showId]
        case 'REMOVE': return previous.filter((showId)=> showId!==action.showId )


        default:
            return previous;
    }
}

export function useShows(key="shows"){
    return usePersistedReducer(showReducer,[],key);
}


export function useLastQuery(key="lastInput"){

    
    const [input,setInput]= useState(()=>{
        const persisted=sessionStorage.getItem(key);
        return persisted? JSON.parse(persisted): '';
    });

    const setPersistedInput=(value)=>{
        sessionStorage.setItem(key,JSON.stringify(value));
        setInput(value);
    }
    return [input,setPersistedInput];
}

const reducer=(prevState,action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {isLoading:false,error:null,show:action.show};
        case 'FETCH_ERROR':
            return {isLoading:false,error:action.error,show:null};
        default: return prevState;
    }
}

export function useShow(showId){


    const [state,dispatch]=useReducer(reducer,{
        isLoading:true,
        error:null,
        show:null,
    });

    useEffect(()=>{

        let isMounted=true;
        apiGet(`shows/${showId}?embed[]=seasons&embed[]=cast`)
        .then(result =>{  setTimeout(()=>{
            if(isMounted){
                dispatch({
                    type:'FETCH_SUCCESS',
                    show:result
                });
            }},3000);  
        })
        .catch(err=>{ if(isMounted){ 
                dispatch({
                    type:'FETCH_ERROR',
                    error:err.message
                })
            } 
        });

        return ()=>{
            isMounted=false;
        }
    },[showId]);

    return [state];

}
