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
import { DistributeState } from './Distribute'; 
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
            case 'DISTRIBUTE':
            case 'SALESFORCECHAT':
            case 'SALESFORCECOMMUNITY':
            case 'LIGHTNING':
            case 'SALESFORCEPARDOT':
            case 'MOBILE':
            case 'EMAIL':
                return <DistributeState />
                break;
        }

    }

    const getDisplayNavState = (nav) => {

        switch (nav) {
            case 'SALESFORCECHAT':
                return 'salesforcechat';
                break;
            case 'SALESFORCECOMMUNITY':
                return 'salesforcecommunity';
                break;
            case 'LIGHTNING':
                return 'lightning';
                break;
            case 'SALESFORCEPARDOT':
                return 'pardot';
            case 'MOBILE':
                    return 'mobile';
                    break;
            case 'EMAIL':
                    return 'email';
                    break;
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