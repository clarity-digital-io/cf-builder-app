import React, { useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import { ButtonInput } from '../Button';

export const Upload = ({ label, style, onChange }) => {

    const theme = { 
        backgroundImage: style.Background_Image__c 
    }

    return (style.Background_Image__c == '' || style.Background_Image__c == null) ?
        <ButtonInput add type="file" accept="image/png" id="file-upload" label={`${label} &#43;`} /> :
        <ThemeProvider theme={theme}>
            <BackgroundView onClick={(e) => onChange(e)} />
        </ThemeProvider> 

}

const BackgroundView = styled.div`
    padding: .5em 2em 2em .5em;  
    background-image: url(${props => props.theme.backgroundImage}) !important;
    cursor: pointer;
    border-radius: 4px;  
`;
