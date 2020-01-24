import React, { useState, useContext } from 'react';
import { Input as AntInput } from 'antd';

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
                        return { ...option, forms__Label__c: value }
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
            return [{ forms__Label__c: value, forms__Clarity_Form_Question__c: activeQuestion.Id }].concat(activeQuestionOptions);
        })

        setNewValue('');

    }

		const closeStyle = {
			height: '60%',
			width: '60%',
		};

    return (
        <ViewStyle>
            <h1>Options</h1>

            <ViewStyle>

                <View className="row middle-xs center-xs">
                    <View className="col-xs-11">
                        <Box padding={'.5em'}>

														<AntInput onPressEnter={(e) => handleKeyDown(e)} value={newValue} id="New" onChange={(e) => setNewValue(e.target.value)}  />

                        </Box>
                    </View>
                    <View className="col-xs-1">
                        <Box padding={'.5em'}>

                            <Button add onClick={() => handleAdd()}>&#43;</Button>

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

																				<AntInput  value={option.forms__Label__c} id={option.Id} placeholder="Option" onChange={(e) => updateOption(e, order)}  />

                                    </Box>
                                </View>
                                <View className="col-xs-1">
                                    <Box padding={'.5em'}>
                                        <div style={closeStyle} onClick={() => removeRow(order)}>

                                            <CloseIcon />

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