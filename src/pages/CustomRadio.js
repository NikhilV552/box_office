import React from 'react'
import {RadioWrapper} from './Radio.styled';


export const CustomRadio=({checked,onChange,label,value,id})=>{

    return (
        <RadioWrapper htmlFor={id}>
            {label} 
            <input type="radio"  value={value} 
                checked={checked} id={id} name={id}
                onChange={onChange} />
            <span />
        </RadioWrapper>
    );
};