import React, { useContext, useEffect } from 'react';
import { TwitterPicker } from 'react-color';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

import {Button} from '../../../Elements/Button';
import {Upload} from '../../../Elements/Upload';

import {Color} from './color'; 

import { BuilderContext } from '../../../Context';

export const DesignState = () => {

    const { form, setForm } = useContext(BuilderContext);

    const updateFormDesign = () => {

    }

    const handleButtonColorChange = (color, e, field) => {

        let hex = color.hex;

        setForm(form => {
            return { ...form, Button_Color__c: hex };
        });

    }

    const handleBackgroundColorChange = (color, e, field) => {

        let hex = color.hex;

        setForm(form => {
            return { ...form, Background_Color__c: hex };
        });

    }

    const handleQuestionColorChange = (color, e, field) => {

        let hex = color.hex;

        setForm(form => {
            return { ...form, Color__c: hex };
        });

    }
    
    return [
        
        <View className="row end-xs">
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button cta onClick={() => updateFormDesign(true)}>
                    Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View className="row">
            <View className="col-xs-12">
                <View className="Box">
                
                    <View className="row middle-xs">
                        <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Box>

                                <ViewStyle space border>

                                    <h2>Design</h2>
                                    <p>Customize your form's colors and font to fit your brand.</p>
                                </ViewStyle>

                                <ViewStyle space border>

                                    <Upload />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={form.Color__c} title={'Question'} handleColorChange={handleQuestionColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={form.Background_Color__c} title={'Background'} handleColorChange={handleBackgroundColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={form.Button_Color__c} title={'Button'} handleColorChange={handleButtonColorChange} />

                                </ViewStyle>


                            </Box>  
                        </View>
                    </View>
                
                </View>
            </View>
        </View>

    ]
}