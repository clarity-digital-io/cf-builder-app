import React, { useContext } from 'react';
import BuilderLayout from '../Elements/Layout/builder';
import {DragDrop} from './Design';
import { BuilderContext } from '../Context';
import { Spinner } from '../Elements/Spinner';

const Builder = () => {

    const { form } = useContext(BuilderContext);
    
    return (
        <BuilderLayout>

            {
                 <Spinner />
            }
            
        </BuilderLayout>  
    );

} 

export default Builder;



