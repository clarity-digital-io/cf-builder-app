import React, { useContext, useEffect, useState } from 'react';
import { Input as AntInput, InputNumber as AntInputNumber} from 'antd';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

import { BuilderContext } from '../../../Context';
import { StatusHandler } from '../../../Elements/Notification';


export const SettingsState = () => {

    const { style, form, setForm } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
                    "ClarityFormBuilder.updateForm", 
                    [JSON.stringify(form)], 
                    (result, e) => resultHandler(result, e, setForm, setUpdate),
                )
            )
        }
        
    }, [update]);

    const updateName = (e) => {

        let value = e.target.value; 

        setForm(form => {
            return { ...form, Name: value }
        })
    }

    const updateLimit = (value) => {
        setForm(form => {
            return { ...form, forms__Limit__c: value }
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

																		<AntInput type="text" id={ form.Name } value={ form.Name } onChange={(e) => updateName(e)} />

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

																		<AntInputNumber min={0} value={ form.forms__Limit__c } onChange={(e) => updateLimit(e)} />

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
                        { update ? 'Saving...' : 'Save Changes' }
                    </Button>
                </ViewStyle>
            </View>
        </View>

    ]
}

const resultHandler = (result, e, setForm, setUpdate) => {
    
    setUpdate(false);
    
    setForm(form => {
        return { ...form, Name: result.Name, forms__Limit__c: result.forms__Limit__c }
    }); 

}