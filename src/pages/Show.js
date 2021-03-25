/*  eslint no-underscore-dangle: [2, { "allow": ["show_", "_bar"] }] */
import React from 'react';
import {useParams} from 'react-router-dom'
import Casts from '../shows/Casts';
import Details from '../shows/Details';
import Seasons from '../shows/Seasons';
import ShowMainData from '../shows/ShowMainData';
import {ShowPageWrapper,InfoBlock} from './Show.styled';
import {useShow} from '../misc/custom-hook';

const Show=()=>{

    // const initialState={
    //     isLoading:true,
    //     error:null,
    //     show:null,
    // }

    // const reducer=(prevState,action)=>{
    //     switch(action.type){
    //         case 'FETCH_SUCCESS':
    //             return {isLoading:false,error:null,show:action.show};
    //         case 'FETCH_ERROR':
    //             return {isLoading:false,error:action.error,show:null};
    //         default: return prevState;
    //     }
    // }


    // const [{isLoading,error,show},dispatch]=useReducer(reducer,initialState);

    const {showId}=useParams();

    // useEffect(()=>{

    //     let isMounted=true;

    //     apiGet(`shows/${showId}?embed[]=seasons&embed[]=cast`)
    //     .then(result =>{  setTimeout(()=>{
    //         if(isMounted){
    //             dispatch({
    //                 type:'FETCH_SUCCESS',
    //                 show:result
    //             });
    //         }},3000);  
    //     })
    //     .catch(err=>{ if(isMounted){ 
    //             dispatch({
    //                 type:'FETCH_ERROR',
    //                 error:err.message
    //             })
    //         } 
    //     });

    //     return ()=>{
    //         isMounted=false;
    //     }
    // },[showId]);

    const {isLoading,error,show}=useShow(showId)[0];

    // console.log("in show state",isLoading,error,show);

    if(isLoading){
        return(
            <div>
                Data is being loaded ....
            </div>
        );
    } 
    if(error!==null){
        return (
            <div>
                Error Occured:{error}
            </div>
        );
    } 
    // eslint-disable-next-line no-underscore-dangle
    const {_embedded}= show;
    const {seasons}= _embedded;
    // eslint-disable-next-line no-underscore-dangle
    const casts= show._embedded.cast;

    return (
        <ShowPageWrapper>
            
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />

            <InfoBlock>
                <h2>The Details</h2>
                <Details status={show.status} network={show.network} premiered={show.premiered} />
            </InfoBlock>

            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={ seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Casts cast={ casts} />
            </InfoBlock>
        </ShowPageWrapper>
    );


};

export default Show;