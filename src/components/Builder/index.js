import React, { useContext } from 'react';
import BuilderLayout from '../Elements/Layout/builder';
import {DragDrop} from './Design';
import { BuilderContext } from '../Context';
import { CenterSpinner } from '../Elements/Spinner';

const Builder = () => {

    const { form } = useContext(BuilderContext);
    
    return (
        <BuilderLayout>

            {
                form.Id ? <DragDrop /> : <CenterSpinner />
            }
            
        </BuilderLayout>  
    );

} 

export default Builder;



