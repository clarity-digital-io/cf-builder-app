import React, { useContext } from 'react';
import LCC from 'lightning-container';

import styled, { css } from 'styled-components';
import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { BuilderContext, DesignContext } from '../../../Context';

export const Header = () => {

    const { form, style } = useContext(BuilderContext); 

    const { setAddPageUpdate, update } = useContext(DesignContext); 

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    const publish = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    return (
        <View className="row middle-xs" header space>

            <View className="col-xs-6">

                <Title>{ form.Name }</Title>

                <Button small update>{ update ? 'Saving... ' : 'Saved' }</Button>

                <Button small status>{ form.Status__c } </Button>

            </View>

            <View className="col-xs-6">

                <View className="row end-xs">

                    {
                        style.Multi_Page__c ? 
                        <View className="col-xs-2">
                            <Button small add onClick={() => setAddPageUpdate(true)}>Add Page</Button>
                        </View> :
                        null
                    }
                    
                    <View className="col-xs-4">

                        <Button small preview onClick={() => preview()}>Preview</Button>

                        {
                            form.Status__c == 'Draft' ? 
                            <Button small publish onClick={() => publish()}>Publish Form</Button> :
                            <Button small publish onClick={() => publish()}>Set to Draft</Button>
                        }

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