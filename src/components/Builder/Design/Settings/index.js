import React, { useContext, useEffect, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

import { BuilderContext } from '../../../Context';
import { Select } from '../../../Elements/Select';


export const SettingstState = () => {

    const { form, setForm } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {
            call(
                "ClarityFormBuilder.updateForm", 
                [JSON.stringify(form)], 
                (result, e) => resultHandler(result, e, setForm, setUpdate)
            );
        }
        
    }, [update]);

    const updateName = (e) => {

        let value = e.target.value; 

        setForm(form => {
            return { ...form, Name: value }
        })
    }

    const updateLimit = (e) => {

        let value = e.target.value; 
        
        setForm(form => {
            return { ...form, Limit__c: value }
        })
    }

    const updateEndDate = (e) => {

        let value = e.target.value; 
        
        setForm(form => {
            return { ...form, End_Date__c: value }
        })
    }

    return [

        <View silver body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Form Settings</h1>

                        <p>Update Form information and set limits on responses.</p>

                    </ViewStyle>


                    <ViewStyle space border>

                        <h1>Form Information</h1>

                        <ViewStyle>

                            <View className="row" >
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>
                                    
                                    <div className="slds-form-element">
                                        <label className="slds-form-element__label" for="text-input-id-1">Form Title</label>
                                        <div className="slds-form-element__control">
                                            <input type="text" value={ form.Name } onChange={(e) => updateName(e)} id="text-input-id-1" placeholder="Form Title" className="slds-input" />
                                        </div>
                                    </div>

                                </Box>
                            </View>
                            </View>

                        </ViewStyle>

                    </ViewStyle>


                    <ViewStyle space border>

                        <h1>Form Response Limits</h1>

                        <View className="row">
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

                                    <div className="slds-form-element">
                                        <label className="slds-form-element__label" for="text-input-id-1">Form Response Submission Limit</label>
                                        <div className="slds-form-element__control">
                                            <input type="number" value={ form.Limit__c } onChange={(e) => updateLimit(e)} id="text-input-id-1" placeholder="Set Number Limit" className="slds-input" />
                                        </div>
                                    </div>

                                </Box>
                            </View>
                        </View>

                        <View className="row">
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

                                    <div className="slds-form-element">
                                        <label className="slds-form-element__label" for="text-input-id-2">End Date</label>
                                        <div className="slds-form-element__control">
                                            <input type="date" value={ form.End_Date__c } onChange={(e) => updateEndDate(e)} id="text-input-id-2" placeholder="Set an End Date" className="slds-input" />
                                        </div>
                                    </div>

                                </Box>
                            </View>
                        </View>

                    </ViewStyle>

                </Box>
            </View>
        </View>, 

        <View footer className="row middle-xs end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle middle>
                    <Button cta onClick={() => setUpdate(true)}>
                        Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setForm, setUpdate) => {
    console.log('result', result); 
    setUpdate(false);
    setForm(form => {
        return { ...form, Name: result.Name, Limit__c: result.Limit__c, End_Date__c: result.End_Date__c }
    }); 
}