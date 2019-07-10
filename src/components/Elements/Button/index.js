import React from 'react';
import styled, { css } from 'styled-components';
import Main from '../Theme'; 

export const Button = styled.button`
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: none;
    padding: .5em; 
    border-radius: 4px; 
    font-weight: 900;
    color: ${Main.color.white};

    ${props => props.emoticon && css`
        font-size: 1.75em; 
        background: none;
    `}
    
    ${props => props.neutral && css`
        margin-left: .5em;
        border: 1px solid ${Main.color.bright}
        background: ${Main.color.bright}
    `}

    ${props => props.add && css`
        padding: 0.5em;
        font-weight: 900; 
        color: ${Main.color.body};
        background: ${Main.color.white};
        border: 1px solid ${Main.color.light}
    `}

    ${props => props.small && css`
        font-size: .75em; 
    `}

    ${props => props.update && css`
        text-transform: uppercase;
        padding: .5em;
        background: ${Main.color.bright}
    `}

    ${props => props.preview && css`
        padding: .5em;
        background:none;
        color: ${Main.color.bright};
    `}

    ${props => props.cta && css`
        margin-left: .5em;
        border: 1px solid ${Main.color.green}
        background: ${Main.color.green}
    `}

    ${props => props.disabled && css`
        background: ${Main.color.silver}
        border: 1px solid ${Main.color.silver};
        color: ${Main.color.body}
    `}


`;
