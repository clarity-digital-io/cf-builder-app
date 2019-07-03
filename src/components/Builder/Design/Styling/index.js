import React, { useContext, useEffect, useState } from 'react';
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

    const { style, setStyle } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    const [file, setFile] = useState('');

    useEffect(() => {

        if(update) {
            call(
                "ClarityFormBuilder.updateDesign", 
                [JSON.stringify(style), file], 
                (result, e) => resultHandler(result, e, setStyle, setUpdate)
            );
        }
        
    }, [update]);

    const handleButtonColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, Button_Color__c: hex };
        });

    }

    const handleBackgroundColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, Background_Color__c: hex };
        });

    }

    const handleQuestionColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, Color__c: hex };
        });

    }

    const uploadChange = (e, d) => {

        let reader = new FileReader(); 

        let files = Array.from(e.target.files);

        reader.readAsDataURL(files[0]);

        reader.onloadend = function () {
            setStyle(style => {
                return { ...style, Background_Image__c: reader.result };
            });
            
            let base64result = reader.result.split(',')[1];

            setFile(base64result); 
        };
    }
    
    return [
        
        <View silver className="row end-xs">
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button cta onClick={() => setUpdate(true)}>
                    { update ? 'Saving...' : 'Save Changes' }
                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View silver body className="row">
            <View className="col-xs-12">
                <View className="Box">
                
                    <View className="row middle-xs">
                        <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Box>

                                <ViewStyle space border>

                                    <h1>Design</h1>
                                    <p>Customize your form's colors and font to fit your brand.</p>
                                </ViewStyle>

                                <ViewStyle space border>

                                    <Upload onChange={uploadChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.Color__c} title={'Question'} handleColorChange={handleQuestionColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.Background_Color__c} title={'Background'} handleColorChange={handleBackgroundColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.Button_Color__c} title={'Button'} handleColorChange={handleButtonColorChange} />

                                </ViewStyle>


                            </Box>  
                        </View>
                    </View>
                
                </View>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setStyle, setUpdate) => {
    console.log(result); 
    setUpdate(false);
    setStyle(result); 
}
