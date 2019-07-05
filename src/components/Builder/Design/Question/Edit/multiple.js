import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import CloseIcon from '../../../../Elements/Icons/close';

import ViewStyle from '../../../../Elements/View/style';
import { DesignContext, EditContext } from '../../../../Context';

export const Multiple = () => {

    const { activeQuestionOptions, setActiveQuestionOptions } = useContext(EditContext);

    const { activeQuestion } = useContext(DesignContext);

    const [newValue, setNewValue] = useState('');

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            let value = e.target.value;
            
            setActiveQuestionOptions(options => {
                return [{ Label__c: value, Clarity_Form_Question__c: activeQuestion.Id }].concat(activeQuestionOptions);
            })

            setNewValue('');

        }

    }

    const updateOption = (e, order) => {

        if(e.key != 'Enter') {
            let value = e.target.value;

            setActiveQuestionOptions((options) => {
                return options.map((option, index) => {

                    if(order == index) {
                        return { ...option, Label__c: value }
                    }
                    return option; 
                })

            })

        }
    }

    const removeRow = (order) => {

        setActiveQuestionOptions(rows => {
            let updated = rows.slice();
            updated.splice(order, 1);
            return updated;
        })

    }

    return (
        <ViewStyle>
            <h1>Options</h1>

            <ViewStyle>

                <div className="slds-form-element__control">
                    <input onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={newValue} type="text" id="New" placeholder="Add Option" className="slds-input" />
                </div>

            </ViewStyle>

            <ViewStyle>

                {
                    activeQuestionOptions.map((option, order) => {

                        return (
                            <View className="row center-xs">
                                <View className="col-xs-11">
                                    <Box>
                                        <div className="slds-form-element__control">
                                            <input onChange={(e) => updateOption(e, order)} onKeyDown={(e) => handleKeyDown(e)} value={option.Label__c} type="text" id={option.Id} placeholder="Option" className="slds-input" />
                                        </div>
                                    </Box>
                                </View>
                                <View className="col-xs-1">
                                    <Box padding={'.5em'}>
                                        <div onClick={() => removeRow(order)}>
                                            <svg className="slds-button__icon" aria-hidden="true">
                                                <CloseIcon />
                                            </svg>
                                        </div>
                                    </Box>
                                </View>
                            </View>
                        )

                    }) 
                }


            </ViewStyle>

        </ViewStyle>
    )

}