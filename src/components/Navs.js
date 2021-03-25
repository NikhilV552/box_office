import React from 'react';
// import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import {NavList,LinkStyled} from './Nav.Styled';

const links=[
    {to:"/home",text:"Go To Home"},
    {to:"/starred",text:"To Starred"}
];


const Nav=()=>{

    const location=useLocation();

    const navs=links.map((value)=>{
        return (
            <li key={value.to}><LinkStyled className={ value.to === location.pathname ? "active": "" } to={value.to} >{value.text}</LinkStyled></li>
        );
    });

    return (
        <div>
            <NavList>
                {navs}
            </NavList>
        </div>
    );
}
export default Nav;