import React, { useEffect, useState } from 'react'
import MainComponent from '../components/MainComponent';
import {useShows} from '../misc/custom-hook';
import {apiGet} from '../misc/config';
import ShowsGrid from '../shows/ShowsGrid';

const Starred=()=>{

    const [starredShows]=useShows();

    const [isLoading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState(null);
    const [shows,setShows]=useState(null);

    useEffect(()=>{

        if(starredShows && starredShows.length >0){

            const promises=starredShows.map((showId)=> apiGet(`shows/${showId}`));
            Promise.all(promises)
            .then(apiData => apiData.map( show => ( { show } )))
            .then(result=> {setIsLoading(false);setShows(result);setIsError(null)})
            .catch(error => {setIsError(error.message);setIsLoading(false);setShows([])});
            setShows(null);

        }else{
            setIsLoading(false);
        }


    },[starredShows]);

    return (
        <MainComponent >
            The is starred Page
            {isLoading && `<div >he shows are being loaded</div>`}
            {isError && `<div>Error Occured:${isError}</div>`}
            {!isLoading && !shows &&  '<div>No Starred Shows</div>'}
            {!isLoading && !isError && shows && <ShowsGrid data={shows} /> }
        </MainComponent>
    );
}

export default Starred;