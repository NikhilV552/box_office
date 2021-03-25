import React,{useState} from 'react'
import MainComponent from '../components/MainComponent';
import{apiGet} from '../misc/config'
import ShowsGrid from '../shows/ShowsGrid';
import ActorGrid from '../actors/ActorGrid'
import {useLastQuery} from '../misc/custom-hook';
import {SearchInput,RadioInputsWrapper,SearchButtonWrapper} from './Home.styled';
import {CustomRadio} from './CustomRadio';

const Home=()=> {

    const [input,setInput]= useLastQuery();

    const [results,setResults]=useState(null);

    const [searchOption,setSearchOption]=useState("shows");

    const isSearchOptionShow=searchOption==="shows";

    const onInputChange=(ev)=>{
        setInput(ev.target.value);
    }

    const handleRadioButtonClick=(ev)=>{
        setSearchOption(ev.target.value);
    }

    const handleSearch=()=>{
        apiGet(`search/${searchOption}?q=${input}`).then(response => setResults(response));
    }

    const handleKeyDowm=(key)=>{
        if(key.keyCode === 13){
            handleSearch();
        }
    }

    const renderResults=()=>{

        if(results && results.length===0){
            return (
                <div>
                    No Results Got
                </div>
            );
        }

        if(results && results.length >0 ){
            // return results.map((item)=>{
            //     return (
            //         item.show!==undefined? <div key={item.show.id}>{item.show.name}</div> : <div key={item.person.id}>{item.person.name}</div>
            //     );
            // });
            return results[0].show!==undefined ? <ShowsGrid data={results} /> : <ActorGrid data={results} /> ;
        }
        return null;
    }


    return (
        <MainComponent>
            <div>
                <SearchInput type="text" value={input} onKeyDown={handleKeyDowm} onChange={onInputChange} placeholder="search for something" />
                <RadioInputsWrapper>
                    <div>
                        <CustomRadio id="shows-search" value="shows" checked={isSearchOptionShow} onChange={handleRadioButtonClick} label="Shows" />
                        {/* <label htmlFor="shows-search">Shows <input type="radio"  value="shows" checked={isSearchOptionShow} id="shows-search" onChange={handleRadioButtonClick} /></label> {" "} */}
                    </div>
                    <div>   
                    <CustomRadio id="actor-search" value="people" checked={!isSearchOptionShow} onChange={handleRadioButtonClick} label="Actors" />                        
                        {/* <label htmlFor="actor-search">Actors <input type="radio"  value="people" checked={!isSearchOptionShow} id="actor-search" onChange={handleRadioButtonClick} /></label> */}
                    </div>
                </RadioInputsWrapper>
                <SearchButtonWrapper>
                <button type="button" onClick={handleSearch}>Search</button>
                </SearchButtonWrapper>
            </div>
            <div>
                {renderResults()}
            </div>
        </MainComponent>
    );
}

export default Home;
