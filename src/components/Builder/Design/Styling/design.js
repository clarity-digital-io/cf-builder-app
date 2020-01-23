import React, { useContext, useEffect, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

import {Button} from '../../../Elements/Button';
import {Upload} from '../../../Elements/Upload';

import {Color} from './color'; 

import { BuilderContext } from '../../../Context';
import { StatusHandler } from '../../../Elements/Notification';

const configUrl = (style) => {

    let forceImage = (style.forms__Background_Image__c != null && style.Background_Image__c != '') ? (style.forms__Background_Image__c.length > 18 ? false : true ) : false;

    return forceImage ? [{ uid: style.Id, thumbUrl:  `/sfc/servlet.shepherd/document/download/${style.forms__Background_Image__c}` }] : [];

}

export const DesignEditState = () => {

    const { style, setStyle, setNavState, setDirtyState } = useContext(BuilderContext);

    const [previousStyle, setPreviousStyle] = useState(style); 

    const [update, setUpdate] = useState(false);

    const [files, setFiles] = useState(() => configUrl(style));

    useEffect(() => {

        if(update) {

            save(); 

        }
        
    }, [update]);

    const revertAndNavigate = () => {

        setStyle(previousStyle); 
        setNavState('DESIGN'); 

    }

    const save = () => {

        let file = style.forms__Background_Image__c ? style.forms__Background_Image__c : '';

        let base64result = ''; 

        if(file != '' && file.length > 18) {

            base64result = file != '' ? file.split(',')[1] : '';

            style.forms__Background_Image__c = ''; 

        }

        StatusHandler(
            form.forms__Status__c, 
            () => setUpdate(false),
            () => call(
                "ClarityFormBuilder.updateDesign", 
                [JSON.stringify(style), base64result], 
                (result, e) => resultHandler(result, e, setStyle, setUpdate, setDirtyState),
            )
        )

    }

    const updateName = (e) => {

        let value = e.target.value; 

        setStyle(style => {
            return { ...style, Name: value }
        })

        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
        }); 

    }

    const updateMultiPage = (e) => {

        let checked = e.target.checked;

        setStyle(style => {
            return { ...style, forms__Multi_Page__c: checked };
        });

        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
        }); 

    }

    const handleButtonColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, forms__Button_Color__c: hex };
        });

        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
        }); 
    }

    const handleBackgroundColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, forms__Background_Color__c: hex };
        });

        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
        }); 
    }

    const handleQuestionColorChange = (color, e, field) => {

        let hex = color.hex;

        setStyle(style => {
            return { ...style, forms__Color__c: hex };
        });
        
        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
        }); 
    }

    const uploadChange = (fileContents) => {

        setStyle(style => {
            return { ...style, forms__Background_Image__c: fileContents };
        });

        setDirtyState(dirty => {
            return { ...dirty, edited: true, save: save }
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
                                            <input checked={style.forms__Multi_Page__c} onChange={(e) => updateMultiPage(e)} type="checkbox" name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                            <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                            <span className="slds-checkbox_faux"></span>
                                            </span>
                                        </label>
                                    </div>

                                </ViewStyle>

                                <ViewStyle space border>
                                    <div className="slds-form-element">
                                        <label className="slds-checkbox_toggle slds-grid">
                                            <span className="slds-form-element__label slds-m-bottom_none">Background Image</span>
                                        </label>
                                        <Upload files={files} setFiles={setFiles} style={style} onChange={uploadChange} />
                                    </div>
                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.forms__Color__c} title={'Question'} handleColorChange={handleQuestionColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.forms__Background_Color__c} title={'Background'} handleColorChange={handleBackgroundColorChange} />

                                </ViewStyle>

                                <ViewStyle space border>

                                    <Color color={style.forms__Button_Color__c} title={'Button'} handleColorChange={handleButtonColorChange} />

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
                    <Button cancel onClick={() => revertAndNavigate()}>
                        Cancel
                    </Button>
                    <Button cta onClick={() => setUpdate(true)}>
                    { update ? 'Saving...' : 'Save Changes' }
                    </Button>
                </ViewStyle>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setStyle, setUpdate, setDirtyState) => {
    setDirtyState(false);
    setUpdate(false);
    setStyle(result); 
}
