import React, { useContext } from 'react';
import styled from 'styled-components';

import { Header } from './header'; 

import { useDrag } from './useDrag';
import { useMultiDrag } from './useMultiDrag';

import { DesignContext, BuilderContext } from '../../../Context';
import { Single } from './single';
import { Multi } from './multi';

export const Display = () => {

    const { style } = useContext(BuilderContext);

    const { questionUpdate } = useContext(DesignContext);

    const { update } = useDrag(); 

    const { multiUpdate } = useMultiDrag(); 

    return [
        <Header key={'Header'} update={questionUpdate || multiUpdate || update} />,
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
    height: 94vh;
    overflow-y: auto;
`;