import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Multiple = () => {

    const { activeQuestion, activeQuestionOptions, setActiveQuestionOptions } = useContext(DesignContext);

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
                    activeQuestionOptions.map(option => {

                        return (
                            <div className="slds-form-element__control">
                                <input onKeyDown={(e) => handleKeyDown(e)} value={option.Label__c} type="text" id={option.Id} placeholder="Option" className="slds-input" />
                            </div>
                        )

                    }) 
                }


            </ViewStyle>

        </ViewStyle>
    )

}