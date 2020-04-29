import React, { useContext, useState } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';
import {Spinner} from '../../../../Elements/Spinner';

import Box from '../../../../Elements/Box';

import {ControlGroup } from '../../../../Elements/ControlField'; 

export const LogicQuestion = () => {

    const { loading, criteria, setCriteria } = useContext(EditContext); 

		const { activeQuestion, questions, setActiveQuestion } = useContext(DesignContext); 

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => (question.forms__Title__c != activeQuestion.forms__Title__c) && (question.forms__Type__c != 'RecordGroup' && question.forms__Type__c != 'FreeText' && question.forms__Type__c != 'PageBreak'))
    )

		const updateCondition = (e) => {
				let value = e.target.value; 

        setActiveQuestion(q => {
            return { ...q, forms__Logic__c: value }
        })
    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Question</h1>

                        <p>{activeQuestion.forms__Title__c}</p>
                        
                    </ViewStyle>
                
                    {

                        loading ? 
                            <ViewStyle space top border>
                                <Spinner />
                            </ViewStyle> :
                            <ViewStyle space top border>

                                <h1>Step 1: <span>Select the criteria for this rule</span></h1>

                                <ControlGroup relatedId={activeQuestion.Id} value={activeQuestion.forms__Logic__c} rows={criteria} setRows={setCriteria} setCondition={updateCondition} questions={questionOptions} />

                            </ViewStyle>

                    }

                </Box>  
            </View>
        </View>
    )
}
