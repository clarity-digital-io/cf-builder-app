import React from 'react';

import View from '../../Elements/View';
import Box from '../../Elements/Box';

import { QuestionState } from './Question';
import { Display } from './Display';

const Design = () => {

    return [
        <View className="col-xs-12 col-sm-3 col-md-3 col-lg-3" scroll>
            <Box padding='0'>
                <QuestionState />
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