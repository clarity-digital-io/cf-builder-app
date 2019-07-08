import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import { Button } from '../../../../Elements/Button';

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
            
            add(value)

        }

    }

    const handleAdd = (e) => {
            
        add(newValue)

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

    const add = (value) => {

        setActiveQuestionOptions(options => {
            return [{ Label__c: value, Clarity_Form_Question__c: activeQuestion.Id }].concat(activeQuestionOptions);
        })

        setNewValue('');

    }

    return (
        <ViewStyle>
            <h1>Options</h1>

            <ViewStyle>

                <View className="row middle-xs center-xs">
                    <View className="col-xs-11">
                        <Box padding={'.5em'}>

                            <div className="slds-form-element__control">
                                <input onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={newValue} type="text" id="New" className="slds-input" />
                            </div>

                        </Box>
                    </View>
                    <View className="col-xs-1">
                        <Box padding={'.5em'}>

                            <Button add onClick={() => handleAdd()}>Add</Button>

                        </Box>
                    </View>
                </View>

            </ViewStyle>

            <ViewStyle>

                {
                    activeQuestionOptions.map((option, order) => {

                        return (
                            <View className="row middle-xs center-xs">
                                <View className="col-xs-11">
                                    <Box padding={'.5em'}>
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