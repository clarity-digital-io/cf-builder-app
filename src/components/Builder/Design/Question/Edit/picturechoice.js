import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import { Button, Image, Emoticon, Input } from '../../../../Elements/Button';

import CloseIcon from '../../../../Elements/Icons/close';

import ViewStyle from '../../../../Elements/View/style';
import { DesignContext, EditContext } from '../../../../Context';

export const PictureChoice = () => {

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
            return options.concat([{ Label__c: value, Clarity_Form_Question__c: activeQuestion.Id }]);
        })

        setNewValue('');

    }

    return (
        <ViewStyle>
            <h1>Picture Choice Options</h1>

            <ViewStyle>

                <View className="row middle-xs center-xs">
                    <View className="col-xs-2">
                        <Box padding={'.5em'}>
                            
                            <Upload setOptions={setActiveQuestionOptions} activeQuestionId={activeQuestion.Id} newOption={true} value={newValue}>
                                <Emoticon>📷</Emoticon>
                            </Upload>

                        </Box>
                    </View>
                    <View className="col-xs-9">
                        <Box padding={'.5em'}>

                            <div className="slds-form-element__control">
                                <input onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={newValue} type="text" id="New" className="slds-input" />
                            </div>

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
                                <View className="col-xs-2">
                                    <Box padding={'.5em'}>

                                        {
                                            option.Choice_Image__c == null ? 
                                            <Upload setOptions={setActiveQuestionOptions} order={order} newOption={false}>
                                                <Emoticon>📷</Emoticon>
                                            </Upload> :
                                            <Upload setOptions={setActiveQuestionOptions} order={order} newOption={false}>
                                                <Image src={option.Choice_Image__c} />
                                            </Upload>
                                        }

                                    </Box>
                                </View>
                                <View className="col-xs-9">
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

const Upload = ({ children, setOptions, order, activeQuestionId, newOption, value }) => {

    const uploadChange = (e, d) => {

        let reader = new FileReader(); 

        let files = Array.from(e.target.files);

        reader.readAsDataURL(files[0]);

        reader.onloadend = function () {

            let base64result = reader.result.split(',')[1];

            setOptions(options => {

                if(newOption) {
                    return [{ Label__c: value, Clarity_Form_Question__c: activeQuestionId, Choice_Image__c: reader.result, Base64: base64result }].concat(options);
                } else {
                    return options.map((o, i) => {
                        if(i == order) {
                            return { ...o, Choice_Image__c: reader.result, Base64: base64result }
                        }
                        return o; 
                    })
                }

            })
 
        };
    }

    const fileInputRef = React.createRef();

    const openFileDialog = () => {
        fileInputRef.current.click();
    }

    return (
        <div onClick={() => openFileDialog()}>
            {children}
            <Input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                onChange={uploadChange}
            />
        </div>
    )
}