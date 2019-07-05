import React, { useEffect, useContext, useState } from 'react';
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

    return [
        <ViewStyle key={'description'}>

            <h1>Connected Object: { form.Connected_Object__c ?  form.Connected_Object__c : <Button small add onClick={() => setNavState('SETTINGS')}>Create a Connected Section</Button> }</h1>

            <p>
                Any fields updated in this { form.Connected_Object__c ? form.Connected_Object__c : 'Connected Object' } section will reflect in the { form.Connected_Object__c ? form.Connected_Object__c : 'Connected Object' } Record.
            </p>

            <p>
                Would you like to provide to an existing record? 
            </p>

        </ViewStyle>,
        <ViewStyle key={'fields'}>

            <h1>Additional Fields</h1>

            {/* <Select options={sObjects} value={form.Connected_Object__c} onChange={update} /> */}

        </ViewStyle>,
    ]

}
