import React, { useContext, useState, useEffect } from 'react';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import {SmallSpinner} from '../../../Elements/Spinner';

import { ControlGroup } from '../../../Elements/ControlField';

import { Lookup } from './lookup';

import { BuilderContext, DesignContext } from '../../../Context';


export const AssignmentState = () => {

    const { questions } = useContext(DesignContext);

    const { loading, assignmentRules, setAssignmentRules, assignment, setAssignment } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {

            setUpdate(false); 

            call(
                "ClarityFormBuilder.saveAssignmentRules", 
                [JSON.stringify(assignment), JSON.stringify(assignmentRules)], 
                (result, e) => resultHandler(result, e, setAssignmentRules, setUpdate)
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

                                <ControlGroup rows={assignmentRules} setRows={setAssignmentRules} questions={questions} />

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