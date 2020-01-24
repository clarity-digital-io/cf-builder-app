import React, { useContext } from 'react';

import View from '../../Elements/View';
import Box from '../../Elements/Box';

import { QuestionState } from './Question/state';
import { ConnectState } from './Connect';
import { MappingState } from './Connect/mapping';
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
            case 'MAPPING':
                return <ConnectState />
                break;
            case 'SETTINGS':
                return <SettingsState />
                break;
        }

    }

    const getDisplayNavState = (nav) => {

        switch (nav) {
            case 'MAPPING':
                return <MappingState key={'MappingState'} />
                break;
            default:
                return <Display key={'DisplayState'} />
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

                { getDisplayNavState(navState) }
                
            </Box>                
        </View>
    ]
}

export default Design;