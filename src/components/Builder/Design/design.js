import React, { useContext } from 'react';

import View from '../../Elements/View';
import Box from '../../Elements/Box';

import { QuestionState } from './Question';
import { DesignState } from './Styling';
import { AssignmentState } from './Assignment';
import { SettingstState } from './Settings'; 
import { Display } from './Display';
import { BuilderContext } from '../../Context';

const Design = () => {
    
    const { navState } = useContext(BuilderContext);

    const getNavState = (nav) => {
        
        switch (nav) {
            case 'QUESTIONS':
                return <QuestionState />
                break;
            case 'DESIGN':
                return <DesignState />
                break;
            case 'ASSIGNMENTS':
                return <AssignmentState />
                break;
            case 'SETTINGS':
                return <SettingstState />
                break;
        }

    }

    return [
        <View className="col-xs-5 col-sm-4 col-md-4 col-lg-4" scroll>
            <Box padding='0'>
                
                { getNavState(navState) }

            </Box> 
        </View>,

        <View className="col-xs-6 col-sm-7 col-md-7 col-lg-7">
            <Box padding='0'>
                <Display />
            </Box>                
        </View>
    ]
}

export default Design;