import React from 'react';
import styled, { css } from 'styled-components';
import Main from '../Theme'; 

export const Button = styled.button`
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: none;
    padding: .75em; 
    border-radius: 4px; 
    margin-left: .5em;
    font-weight: 900;

    ${props => props.neutral && css`
        border: 1px solid ${Main.color.silver}
        background: none
    `}

    ${props => props.add && css`
        padding: 0.5em;
        font-weight: 500; 
        color: ${Main.color.body};
        background: ${Main.color.silver};
    `}

    ${props => props.cta && css`
        border: 1px solid ${Main.color.green}
        color: ${Main.color.green}
    `}

`;
