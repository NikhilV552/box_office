import React from 'react'
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../images/not-found.png'
import {FlexGrid} from '../components/styled';
import { useShows } from '../misc/custom-hook';

const ShowsGrid=({data})=>{


    const [starredShows,dispatchStarredShows]=useShows();


    // const datamap=data.map((item)=>{
    //     return <ShowCard key={item.show.id} 
    //         id={item.show.id} 
    //         name={item.show.name} 
    //         image={item.show.image?item.show.image.medium:IMAGE_NOT_FOUND}
    //         summary={item.show.summary}
    //     />
    // });
    return (
        <FlexGrid>
            {
                data.map((item)=>{
                    const isStarred=starredShows.includes(item.show.id);

                    const onStarClick=()=>{
                        if(isStarred){
                            dispatchStarredShows({
                                type:'REMOVE',
                                showId:item.show.id
                            });
                        } else{
                            dispatchStarredShows({
                                type:'ADD',
                                showId:item.show.id
                            });
                        }
                    }

                    return (
                        <ShowCard key={item.show.id} 
                        id={item.show.id} 
                        name={item.show.name} 
                        image={item.show.image?item.show.image.medium:IMAGE_NOT_FOUND}
                        summary={item.show.summary}
                        onStarClick={onStarClick}
                        isStarred={isStarred}
                    />);
                })
            
            }
        </FlexGrid>
    );
}
export default ShowsGrid;