import React, { useContext } from 'react';
import LCC from 'lightning-container';

import styled, { css } from 'styled-components';
import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { BuilderContext } from '../../../Context';

export const Footer = ({ update }) => {

    const { form } = useContext(BuilderContext); 

    return (
        <View className="row middle-xs" footer display space>

            <View className="col-xs-12">

                <View className="row end-xs">

                    <View className="col-xs-2">

                        <Button add onClick={() => console.log()}>Publish</Button>

                    </View>

                </View>

            </View>
            
        </View>
    )

}
