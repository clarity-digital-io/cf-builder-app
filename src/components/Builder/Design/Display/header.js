import React, { useContext } from 'react';
import LCC from 'lightning-container';

import styled, { css } from 'styled-components';
import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { BuilderContext } from '../../../Context';

export const Header = ({ update }) => {

    const { form } = useContext(BuilderContext); 

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    return (
        <View className="row middle-xs" header space>

            <View className="col-xs-6">

                <Title>{ form.Name }</Title>

                <Button small update>{ update ? 'Saving... ' : 'Saved' }</Button>

            </View>

            <View className="col-xs-6">

                <View className="row end-xs">

                    <View className="col-xs-2">

                        <Button small preview onClick={() => preview()}>Preview</Button>

                    </View>

                </View>

            </View>
            
        </View>
    )

}

const Title = styled.div`
    font-size: 1em; 
    display: inline; 
    font-weight: 900; 
    margin-right: .5em;
`