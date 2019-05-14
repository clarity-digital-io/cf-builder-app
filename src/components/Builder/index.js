import React, { useContext } from 'react';
import BuilderLayout from '../Elements/Layout/builder';
import {DragDrop} from './Design';
import { BuilderContext } from '../Context';

const Builder = () => {

    const { form } = useContext(BuilderContext);
    console.log(form);
    
    return (
        <BuilderLayout>

            {
                form.Id ? <DragDrop /> : 'Loading'
            }
            
        </BuilderLayout>  
    );

} 

export default Builder;



