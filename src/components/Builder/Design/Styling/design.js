import React, { useContext, useEffect, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

import {Button} from '../../../Elements/Button';
import {Upload} from '../../../Elements/Upload';

import {Color} from './color'; 

import { BuilderContext } from '../../../Context';

export const DesignEditState = () => {

    const { style, setStyle, setNavState } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    const [files, setFiles] = useState([]);

    useEffect(() => {

        if(update) {

            let file = style.Background_Image__c ? style.Background_Image__c : '';

            style.Background_Image__c = ''; 
            
            call(
                "ClarityFormBuilder.updateDesign", 
                [JSON.stringify(style), file], 
                (result, e) => resultHandler(result, e, setStyle, setUpdate)
            );
        }
        
    }, [update]);

    const updateName = (e) => {

        let value = e.target.value; 

        setStyle(style => {
            return { ...style, Name: value }
        })
    }

    const updateMultiPage = (e) => {

        let checked = e.target.checked;

        setStyle(style => {
            return { ...style, Multi_Page__c: checked };
        });

    }

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

    const uploadChange = (fileContents) => {

        setStyle(style => {
            return { ...style, Background_Image__c: fileContents };
        });

    }

    return [
        
        <View key={'body'} silver body className="row">
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

                                    <ViewStyle>

                                        <View className="row" >
                                        <View className="col-xs-12">
                                            <Box padding='1em 0 0 0'>
                                                
                                                <div className="slds-form-element">
                                                    <label className="slds-form-element__label" htmlFor="text-input-id-1">Style Name</label>
                                                    <div className="slds-form-element__control">
                                                        <input type="text" value={ style.Name } onChange={(e) => updateName(e)} id="text-input-id-1" placeholder="Style Name" className="slds-input" />
                                                    </div>
                                                </div>

                                            </Box>
                                        </View>
                                        </View>

                                    </ViewStyle>

                                </ViewStyle>

                                <ViewStyle space border>

                                    <div className="slds-form-element">
                                        <label className="slds-checkbox_toggle slds-grid">
                                            <span className="slds-form-element__label slds-m-bottom_none">Multi Page Form</span>
                                            <input checked={style.Multi_Page__c} onChange={(e) => updateMultiPage(e)} type="checkbox" name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                            <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                            <span className="slds-checkbox_faux"></span>
                                            </span>
                                        </label>
                                    </div>

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Upload files={files} setFiles={setFiles} style={style} onChange={uploadChange} />

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
        </View>, 
        <View key={'footer'} footer className="row middle-xs end-xs">
            <View className="col-xs-12">
                <ViewStyle middle>
                    <Button neutral onClick={() => setNavState('DESIGN')}>
                        Back
                    </Button>
                    <Button cta onClick={() => setUpdate(true)}>
                    { update ? 'Saving...' : 'Save Changes' }
                    </Button>
                </ViewStyle>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setStyle, setUpdate) => {
    setUpdate(false);
    setStyle(result); 
}
