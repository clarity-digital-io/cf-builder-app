import React, { useEffect, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import {Button} from '../../../../Elements/Button';
import {Checkbox} from '../../../../Elements/Checkbox';
import { EditContext, BuilderContext } from '../../../../Context';

export const ConnectedObject = () => {

    const { form, setNavState } = useContext(BuilderContext);

    const { activeQuestionConnectedFields, setActiveQuestionConnectedFields, setSObjectEdit, requiredFields, additionalFields } = useContext(EditContext);

    useEffect(() => {

        if(form.Connected_Object__c) {
            setSObjectEdit(form.Connected_Object__c);
        }

    }, [])

    const update = (e) => {
        
        let target = e.target.value; 
        let value = e.target.checked; 
        console.log(e.target.value, e.target.checked); 
    }

    const [checkedItems, setCheckedItems] =  useState(calculateCheckedItems(additionalFields, activeQuestionConnectedFields));

    const calculateCheckedItems = () => {
        
    }

    return [
        <ViewStyle key={'description'}>

            <h1>Connected Object: { form.Connected_Object__c ?  form.Connected_Object__c : <Button small add onClick={() => setNavState({ NavState: 'SETTINGS'})}>Create a Connected Section</Button> }</h1>

            <p>
                Any fields updated in this { form.Connected_Object__c ? form.Connected_Object__c : 'Connected Object' } section will reflect in the { form.Connected_Object__c ? form.Connected_Object__c : 'Connected Object' } Record.
            </p>

        </ViewStyle>,
        <ViewStyle key={'fields'}> 

            <View className="row">

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Box>

                        <h1>Required Fields</h1>

                        {/* <Checkbox options={Object.keys(requiredFields)} checked={}  /> */}

                    </Box>
                </View>

                <View className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Box>

                        <h1>Additional Fields</h1>

                        {/* <Checkbox  onChange={update} /> */}

                    </Box>
                </View>
            </View>
        </ViewStyle>
    ]

}
