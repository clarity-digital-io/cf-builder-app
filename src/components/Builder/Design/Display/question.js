import React from 'react';
import styled from 'styled-components';

import { getType } from './Choices'; 

export const Question = ({ question }) => {


    return (
        <ViewStyle>

            {
                getType(question)
            }

        </ViewStyle>
    )
}

const ViewStyle = styled.div`
    padding: 1em;
    margin-bottom: 1em;
`;