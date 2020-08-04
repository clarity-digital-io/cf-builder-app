import React, { useContext, useState } from 'react';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import { Select } from '../../../Elements/Select'; 

import { BuilderContext, DesignContext } from '../../../Context';

const combineQuestions = (questions, recordGroup) => {

    let filteredQuestions = questions.filter(question => (question.forms__Type__c != 'FreeText' && question.forms__Type__c != 'RecordGroup'));

    let rcQuestions =  Array.from(recordGroup.values()).reduce((accum, qs, index) => {

        return accum.concat(qs.map(q => q)); 

    }, []);

    return filteredQuestions.concat(rcQuestions); 
}

export const PreFillState = () => {

    const { questions, recordGroup } = useContext(DesignContext);

    const { activeFieldPrefills, setActiveFieldPrefills, activeConnection, activeFields } = useContext(BuilderContext);

    const [questionOptions, setQuestionOptions] = useState(combineQuestions(questions, recordGroup));

    const addConnectionField = () => {
        setActiveFieldPrefills((mappings) => {
            return mappings.concat([{ forms__Form_Connection__c: activeConnection.Id, forms__Salesforce_Field__c: '', forms__Question__c: '', forms__PreFill__c: true }])
        })
    }

    const setFieldSelection = (selection, order) => {
			let value = selection[0].value;

			setActiveFieldPrefills((mappings) => {
					//same field as used record group fields must replace to be able to prefill record group fields
					return mappings.map((mapping, i) => {
							if(i == order) {
									return { ...mapping, forms__Salesforce_Field__c: value }
							}
							return mapping
					})

			});
    }
    
    const setQuestionSelection = (selection, order, custom) => {

			let value = custom ? e.target.value : selection[0].value;

			setActiveFieldPrefills((mappings) => {

					return mappings.map((mapping, i) => {
							if(i == order) {
									return { ...mapping, forms__Question__c: value }
							}
							return mapping
					})

			});

    }

    return [
        <View>
            <View border className="row center-xs middle-xs">
                <View className="col-xs-5">
                    <Box padding='0em'>
                        
                        <h2>Form Value</h2>

                    </Box>
                </View>
                <View className="col-xs-2">
                    <Box padding='0em'>
                        
                    </Box>
                </View>
                <View className="col-xs-5">
                    <Box padding='0em'>
                        
                        <h2>Salesforce Field</h2>

                    </Box>
                </View>
            </View>

            {
                activeFieldPrefills.map((field, order) => {

                    return (
                        <View key={order} border space className="row center-xs middle-xs">

                            <QuestionFieldSelect 
                                order={order} 
                                options={questionOptions} 
                                value={field} 
                                onChange={setQuestionSelection} 
                            />

                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    &#x2190;
                                </Box>
                            </View>

                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    
                                    <FieldSelect order={order} options={activeFields} value={field.forms__Salesforce_Field__c} onChange={setFieldSelection} />

                                </Box>
                            </View>

                        </View>
                    )

                })
            }

            <View border space className="row center-xs middle-xs">
                <View className="col-xs-5">
                    <Box padding='0em'>

                        <Button add onClick={() => addConnectionField()}>Add Connection Field &#x2b;</Button>

                    </Box>
                </View>
            </View>

        </View> 
    ]
}

const FieldSelect = ({ order, options, value, onChange }) => {

		return <Select key={order} value={value} options={options} onChange={(e) => onChange(e, order)} />

}


const QuestionFieldSelect = ({ order, options, value, onChange }) => {

    return (
        <View key={'Select'} className="col-xs-5">
            <Box padding='.5em'>

								<Select 
									placeholder={'Please Select'}
									valueField={'Id'} 
									labelField={'forms__Title__c'}
									key={order} 
									value={value.forms__Question__c ? value.forms__Question__c : value.forms__Custom_Value__c} 
									options={options} 
									onChange={(e) => onChange(e, order)} 
									setLabel={true} 
								/>

            </Box>
        </View>
    )

}