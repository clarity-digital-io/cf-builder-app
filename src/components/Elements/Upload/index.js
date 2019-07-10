import React, { useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import UploadIcon from '../Icons/upload';
import { Button } from '../Button';

export const Upload = ({ style, onChange }) => {

    const theme = { 
        backgroundImage: style.Background_Image__c 
    }

    return style.Background_Image__c != '' ?
        <ThemeProvider theme={theme}>
            <BackgroundView onClick={(e) => onChange(e)} />
        </ThemeProvider> :
        <Button add>&#43;</Button>

}

const BackgroundView = styled.div`
    padding: .5em 2em 2em .5em;  
    background-image: url(${props => props.theme.backgroundImage}) !important;
    cursor: pointer;
    border-radius: 4px;  
`;
