import React, { useContext } from 'react';

import View from '../../Elements/View';
import Box from '../../Elements/Box';

import { QuestionState } from './Question/state';
import { DesignState } from './Styling/';
import { DesignEditState } from './Styling/design';
import { ConnectState } from './Connect';
import { MappingState } from './Connect/mapping';
import { AssignmentState } from './Assignment';
import { SettingsState } from './Settings'; 
import { Display } from './Display';
import { BuilderContext } from '../../Context';

const Design = () => {
    
    const { navState } = useContext(BuilderContext);

    const getNavState = (nav) => {
        
        switch (nav) {
            case 'QUESTIONS':
                return <QuestionState />
                break;
            case 'CONNECT':
                return <ConnectState />
                break;
            case 'MAPPING':
                return <MappingState />
                break;
            case 'DESIGN':
                return <DesignState />
                break;
            case 'DESIGNEDIT':
                return <DesignEditState />
                break;
            case 'ASSIGNMENTS':
                return <AssignmentState />
                break;
            case 'SETTINGS':
                return <SettingsState />
                break;
        }

    }

    return [
        <View key={'QuestionState'} className="col-xs-5 col-sm-4 col-md-4 col-lg-4" scroll>
            <Box padding='0'>
                
                { getNavState(navState) }

            </Box> 
        </View>,

        <View key={'QuestionDisplay'} className="col-xs-6 col-sm-7 col-md-7 col-lg-7">
            <Box padding='0'>
                <Display />
            </Box>                
        </View>
    ]
}

export default Design;