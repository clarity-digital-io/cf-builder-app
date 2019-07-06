import React, { useContext, useState } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';
import {SmallSpinner} from '../../../../Elements/Spinner';

import Box from '../../../../Elements/Box';

import {ControlGroup } from '../../../../Elements/ControlField'; 

export const LogicQuestion = () => {

    const { loading, criteria, setCriteria } = useContext(EditContext); 

    const { activeQuestion, questions, setActiveQuestion } = useContext(DesignContext); 

    const [questionOptions, setQuestionOptions] = useState(
        questions.filter(question => question.Title__c != activeQuestion.Title__c)
    )

    const updateCondition = (e) => {

        let checked = e.target.checked;
        let id = e.target.id; 

        setActiveQuestion(q => {
            return { ...q, Logic__c: checked ? id : q.Logic__c }
        })
    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>Question</h1>

                        <p>{activeQuestion.Title__c}</p>
                        
                    </ViewStyle>
                
                    {

                        loading ? 
                            <ViewStyle space top border>
                                <SmallSpinner />
                            </ViewStyle> :
                            <ViewStyle space top border>

                                <h2>Step 1: <span>Select the criteria for this rule</span></h2>

                                <ControlGroup relatedId={activeQuestion.Id} value={activeQuestion.Logic__c} rows={criteria} setRows={setCriteria} setCondition={updateCondition} questions={questionOptions} />

                            </ViewStyle>

                    }

                </Box>  
            </View>
        </View>
    )
}
