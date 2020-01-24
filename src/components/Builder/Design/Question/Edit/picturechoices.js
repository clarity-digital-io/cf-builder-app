import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';

import { Upload, Icon, Modal } from 'antd';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import CloseIcon from '../../../../Elements/Icons/close';

import { Button } from '../../../../Elements/Button';
import { EditContext, DesignContext } from '../../../../Context';

export const PictureChoices = ({ question }) => {

    const [preview, setPreview] = useState({ image: null, visible: false });

    const { activeQuestionOptions, setActiveQuestionOptions } = useContext(EditContext);

    const { activeQuestion } = useContext(DesignContext);

    const handlePreview = (file) => {
        setPreview({ image: file.thumbUrl, visible: true })
    }

    const handleCancel = (file) => {
        setPreview(preview => {
            return { ...preview, visible: false }
        })
    }

    const updateImage = (order, file) => {

        setActiveQuestionOptions((options) => {
            return options.map((option, index) => {

                if(order == index) {
                    return { ...option, forms__Choice_Image__c: file }
                }
                return option; 
            })

        })

    }

    const updateOption = (e, order, file) => {

        if(e.key != 'Enter') {
            let value = e.target.value;

            setActiveQuestionOptions((options) => {
                return options.map((option, index) => {

                    if(order == index) {
                        return { ...option, forms__Label__c: value, forms__Choice_Image__c: file }
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

    const add = (value, activeQuestionId) => {

        setActiveQuestionOptions(options => {
            return options.concat([{ forms__Label__c: value, forms__Clarity_Form_Question__c: activeQuestionId }]);
        })
    }
    
    return (
        <ViewStyle>

            <h1>Picture Choice Options</h1>

            <ViewStyle>

                <PictureChoice 
                    isNew={true} 
                    activeQuestionId={activeQuestion.Id} 
                    handlePreview={handlePreview}
                    add={add} 
                    updateImage={updateImage}
                />

                <Modal visible={preview.visible} footer={null} onCancel={() => handleCancel()}>
                    <img alt="example" style={{ width: '100%' }} src={preview.image} />
                </Modal>

            </ViewStyle>

            {
                    activeQuestionOptions.map((option, order) => {
                        return (
                            <PictureChoice
                                isNew={false} 
                                updateOption={updateOption}
                                activeQuestionId={activeQuestion.Id} 
                                option={option} 
                                order={order} 
                                handlePreview={handlePreview} 
                                removeRow={removeRow}
                                updateImage={updateImage}
                            />
                        )
                    })
            }

        </ViewStyle>
    )

}

const UploadButton = () => {
    return (
        <div>
            <Icon type="plus" />
        </div>
    )
}

const UploadStyle = styled(Upload)`
    
    display: block !important;

    .ant-upload, .ant-upload-list-item {
        float: none !important;
        width: 100% !important;
        max-height: 28px !important;
        margin: 0px !important; 
        padding: 1px !important; 
    }

`

const PictureChoice = ({ isNew, activeQuestionId, option, order, handlePreview, updateOption, add, removeRow, updateImage }) => {

    const [newValue, setNewValue] = useState('');

    const [file, setFile] = useState([]);

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            let value = e.target.value;
            
            add(value, activeQuestionId, file);

            setNewValue('');

        }

    }

    const handleAdd = (e) => {
            
        add(newValue, activeQuestionId, file);

        setNewValue('');

    }

    const uploadChange = ({ fileList }) => {

        setFile(files => {

            return fileList;

        })

    }

    const handleUpload = ({ file, onSuccess }) => {

        let reader = new window.FileReader();

        reader.readAsDataURL(file);

        reader.onload = (...args) => {
    
            let fileContents = reader.result;

            onSuccess('done', file);

            updateImage(order, fileContents)

        };
    }

		const closeStyle = {
			height: '60%',
			width: '60%',
		};

    return (
        <View className="row middle-xs">
            <View className="col-xs-2">
                <Box padding={'.5em'}>

                    <UploadStyle
                        action="memory"
                        customRequest={(o) => handleUpload(o)}
                        listType="picture-card"
                        fileList={file}
                        onPreview={(f) => handlePreview(f)}
                        onChange={(e) => uploadChange(e)}
                    >
                        {file.length >= 1 ? null : <UploadButton />} 
                    </UploadStyle>
                </Box>
            </View>

            {
                isNew ? 
                [
                    <View className="col-xs-9">
                        <Box padding={'.5em'}>
                            
														<AntInput onPressEnter={(e) => handleKeyDown(e)} value={newValue} id="New" onChange={(e) => setNewValue(e.target.value)}  />

                        </Box>
                    </View>,
                    <View className="col-xs-1">
                        <Box padding={'.5em'}>
            
                            <Button add onClick={() => handleAdd()}>&#43;</Button>
            
                        </Box>
                    </View>
                ] : 
                [
                    <View className="col-xs-9">
                    <Box padding={'.5em'}>

												<AntInput  value={option.forms__Label__c} id={option.Id} placeholder="Option" onChange={(e) => updateOption(e, order)}  />
                        
                    </Box>
                    </View>,
                    <View className="col-xs-1">
                        <Box padding={'.5em'}>
														<div style={closeStyle} onClick={() => removeRow(order)}>

															<CloseIcon />

														</div>       
                        </Box>
                    </View>
                ]
            }

        </View>
    )
}

