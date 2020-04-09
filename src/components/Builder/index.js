import React, { useContext } from 'react';
import BuilderLayout from '../Elements/Layout/builder';
import {DragDrop} from './Design';
import { BuilderContext } from '../Context';
import { CenterSpinner } from '../Elements/Spinner';
import { IconSettings } from '@salesforce/design-system-react';

const Builder = () => {

    const { form } = useContext(BuilderContext);
    
    return (
        <BuilderLayout>
					<IconSettings iconPath={getIconPath()}>

            {
                form.Id ? <DragDrop /> : <CenterSpinner />
            }
          </IconSettings>
        </BuilderLayout>  
    );

}

const getIconPath = () => {
	return process.env.NODE_ENV == 'development' ? "/assets/icons" : "/_slds/icons"
}

export default Builder;



