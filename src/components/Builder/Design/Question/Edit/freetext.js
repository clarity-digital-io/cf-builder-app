import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';
import { Radio } from 'antd';

export const FreeText = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const onChange = (e) => {

        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, FreeText_Type__c: value }
        });

    }

    return (
        <ViewStyle>
            <h1>Free Text Type</h1>

            <p>Display as a header or a paragraph for a short description.</p>

            <ViewStyle>

                <View className="row middle-xs">
                    <View className="col-xs-12">
                        <Box padding={'.5em'}>

                        <Radio.Group buttonStyle="solid" onChange={(e) => onChange(e)} defaultValue={activeQuestion.FreeText_Type__c}>
                            <Radio.Button value="Header">Header</Radio.Button>
                            <Radio.Button value="Paragraph">Paragraph</Radio.Button>
                        </Radio.Group> 

                        </Box>
                    </View>
                </View>

            </ViewStyle>

        </ViewStyle>
    )

}