import React, { useContext } from 'react';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

import { BuilderContext } from '../../../Context';
import { Select } from '../../../Elements/Select';


export const SettingstState = () => {

    const { sObjects, form, setForm } = useContext(BuilderContext);

    const save = () => {}

    const updateConnectedObject = (e) => {

        let value = e.target.value; 

        setForm(form => {
            return { ...form, Connected_Object__c: value }
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

        <View className="row end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button cta onClick={() => save(true)}>
                        Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Form Settings</h1>

                        <p>Connect to Salesforce objects and set limits on responses.</p>

                    </ViewStyle>

                    <View>

                    </View>

                    <ViewStyle space border>

                    <h1>Form Response Limits</h1>

                    <View className="row">
                        <View className="col-xs-12">
                            <Box padding='1em 0 0 0'>

                                <div className="slds-form-element">
                                    <label class="slds-form-element__label" for="text-input-id-1">Form Response Submission Limit</label>
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
                                    <label class="slds-form-element__label" for="text-input-id-2">End Date</label>
                                    <div className="slds-form-element__control">
                                        <input type="date" value={ form.End_Date__c } onChange={(e) => updateEndDate(e)} id="text-input-id-2" placeholder="Set an End Date" className="slds-input" />
                                    </div>
                                </div>

                            </Box>
                        </View>
                    </View>

                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>Salesforce Object Connect</h1>

                        <p>Connect up to 2 Salesforce standard or custom objects to this form.</p>

                        <ViewStyle>

                            <View className="row" >
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

                                    <Select options={sObjects} value={form.Connected_Object__c} onChange={updateConnectedObject} />

                                </Box>
                            </View>
                            </View>

                        </ViewStyle>

                    </ViewStyle>

                </Box>
            </View>
        </View>

    ]
}
