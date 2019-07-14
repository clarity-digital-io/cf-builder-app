import React, { useContext } from 'react';
import LCC from 'lightning-container';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';

import { Button } from '../../../Elements/Button';
import { BuilderContext } from '../../../Context';

export const Footer = ({ update }) => {

    const { form } = useContext(BuilderContext); 

    return (
        <View className="row middle-xs end-xs" footer displayFooter>
                
            <ViewStyle middle>
                <Button neutral onClick={() => console.log()}>Publish</Button>
            </ViewStyle>
            
        </View>
    )

}
