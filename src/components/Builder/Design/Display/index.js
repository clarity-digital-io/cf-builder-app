import React, { useContext } from 'react';
import styled from 'styled-components';

import { useDrag } from './useDrag';
import { useMultiDrag } from './useMultiDrag';

import { DesignContext, BuilderContext } from '../../../Context';
import { Single } from './single';
import { Multi } from './multi';

export const Display = () => {

    const { style } = useContext(BuilderContext);

    return [
        <FormDesign key={'Display'}>

            {
                !style.forms__Multi_Page__c ? 
                <Single style={style} /> :
                <Multi style={style}  />
            }

        </FormDesign>
    ];

}

const FormDesign = styled.div`
    height: 92.5vh;
    overflow-y: auto;
`;