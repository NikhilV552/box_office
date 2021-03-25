import React from 'react'
import ActorCard from './ActorCard'
import IMAGE_NOT_FOUND from '../images/not-found.png';
import {FlexGrid} from '../components/styled'

const ActorGrid=({data})=>{

    const datamap=data.map((item)=>{
        return <ActorCard key={item.person.id} 
            id={item.person.id}  
            name={item.person.nsme} 
            image={item.person.image?item.person.image.medium:IMAGE_NOT_FOUND} 
            country={item.person.country?item.person.country.name:null} 
            birthday={item.person.birthday}
            deathday={item.person.deathday}
            gender={item.person.gender}
        />
    });
    return (
        <FlexGrid>{datamap}</FlexGrid>
    );
}
export default ActorGrid;