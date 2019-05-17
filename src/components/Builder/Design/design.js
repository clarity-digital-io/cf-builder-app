import React, { useContext } from 'react';

import View from '../../Elements/View';
import Box from '../../Elements/Box';

import { QuestionState } from './Question';
import { DesignState } from './Styling';
import { Display } from './Display';
import { BuilderContext } from '../../Context';

const Design = () => {

    const { form } = useContext(BuilderContext);

    const getNavState = (nav) => {
        
        switch (nav) {
            case 'QUESTIONS':
                return <QuestionState />
                break;
            case 'DESIGN':
                return <DesignState />
                break;
            default:
                break;
        }

    }

    return [
        <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3" scroll>
            <Box padding='0'>
                
                { getNavState(form.NavState) }

            </Box> 
        </View>,

        <View className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <Box padding='0'>
                <Display />
            </Box>                
        </View>
    ]
}

export default Design;