import React, { useContext, useState, useEffect } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import {SmallSpinner} from '../../../Elements/Spinner';

import { ControlGroup } from '../../../Elements/ControlField';

import { Lookup } from './lookup';

import { BuilderContext, DesignContext } from '../../../Context';
import { StatusHandler } from '../../../Elements/Notification';


export const AssignmentState = () => {

    const { questions } = useContext(DesignContext);

    const { loading, assignmentRules, setAssignmentRules, assign, setAssignment, form } = useContext(BuilderContext);

    const updateCondition = (e) => {

        let checked = e.target.checked;
        let id = e.target.id; 

        setAssignment(a => {
            return { ...a, Logic__c: checked ? id : a.Logic__c }
        })
    }

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {

            StatusHandler(
                form.Status__c,
                () => setUpdate(false),
                () => call(
                    "ClarityFormBuilder.saveAssignmentRules", 
                    [JSON.stringify(assign), JSON.stringify(assignmentRules)], 
                    (result, e) => resultHandler(result, e, setAssignmentRules, setUpdate)
                )
            );

        }
        
    }, [update]);

    return [

        <View silver body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Form Response Assignment Rule</h1>

                        <p>A simple version of the Case Assignment Rules but for Clarity Form Responses.</p>

                    </ViewStyle>

                    {

                    loading ? 
                        <ViewStyle space top border>
                            <SmallSpinner />
                        </ViewStyle> :
                        [   

                            <ViewStyle key={'Rules'} space top border scrollAssign>

                                <h2>Step 1: <span>Select the criteria for this rule</span></h2>

                                <ControlGroup type={'assign'} relatedId={assign.Id} value={assign.Logic__c} rows={assignmentRules} setRows={setAssignmentRules} setCondition={updateCondition} questions={questions} />

                            </ViewStyle>,

                            <ViewStyle key={'Assignment'} space top border>

                                <h2>Step 2: <span>Select the user or queue to assign the Form Response to when criteria is met.</span></h2>

                                <Lookup setSelected={setAssignment} />

                            </ViewStyle>


                        ]

                    }

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

const resultHandler = (result, e, setAssignmentRules, setUpdate) => {
    
    setUpdate(false);

    setAssignmentRules(result); 

}