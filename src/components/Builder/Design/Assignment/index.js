import React, { useContext } from 'react';

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

    const { form, setForm, loading, assignmentRules, setAssignmentRules } = useContext(BuilderContext);

    const updateAssignmentRules = () => {

    }

    return [

        <View className="row end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button cta onClick={() => updateAssignmentRules(true)}>
                    Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View className="row" key={'Body'}>
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

                            <ViewStyle space top border scrollAssign>

                            <h2>Step 1: <span>Select the criteria for this rule</span></h2>

                            <ControlGroup rows={assignmentRules} setRows={setAssignmentRules} questions={questions} />

                            </ViewStyle>,

                            <ViewStyle space top border>

                            <h2>Step 2: <span>Select the user or queue to assign the Form Response to when criteria is met.</span></h2>

                            <Lookup />

                            </ViewStyle>


                        ]

                    }

                </Box>
            </View>
        </View>

    ]
}
