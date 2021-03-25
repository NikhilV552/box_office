import React from 'react'
import Nav from './Navs'
import Title from './TitleComponent';

const MainComponent= ({ children })=>{
    return (
        <div>
            <div>
                <div>
                    <Title title="Box Office" subTitle="Are you looking for a movie or an actor?" />
                </div>
            </div>
            <Nav />
            <div>
                {children}
            </div>
        </div>
    );
}

export default MainComponent;