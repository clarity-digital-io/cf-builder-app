import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Upload, Icon, Modal } from 'antd';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';

import { Button } from '../../../../Elements/Button';
import { EditContext, DesignContext } from '../../../../Context';

export const PictureChoice = ({ question }) => {

    const [preview, setPreview] = useState({ image: null, visible: false });

    const { activeQuestionOptions, setActiveQuestionOptions } = useContext(EditContext);

    const { activeQuestion } = useContext(DesignContext);

    const [newValue, setNewValue] = useState('');

    const add = (value) => {

        setActiveQuestionOptions(options => {
            return options.concat([{ Label__c: value, Clarity_Form_Question__c: activeQuestion.Id }]);
        })

        setNewValue('');

    }

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            let value = e.target.value;
            
            add(value)

        }

    }

    const handleAdd = (e) => {
            
        add(newValue)

    }

    const removeRow = (order) => {

        setActiveQuestionOptions(rows => {
            let updated = rows.slice();
            updated.splice(order, 1);
            return updated;
        })

    }

    const [files, setFiles] = useState([]);

    const handlePreview = (file) => {
        setPreview({ image: file.thumbUrl, visible: true })
    }

    const handleCancel = (file) => {
        setPreview(preview => {
            return { ...preview, visible: false }
        })
    }

    const uploadChange = (id, { fileList }) => {
        console.log(id, fileList);
        setFiles(files => {

            files[id] = fileList;

            return files; 
            
        })

    }

    const handleUpload = ({ file, onSuccess }) => {

        let reader = new window.FileReader();

        reader.readAsDataURL(file);

        reader.onload = (...args) => {
    
            let fileContents = reader.result;

            onSuccess('done', file);
            console.log('fileContents', fileContents);
            //update(fileContents); 

        };
    }

    return (
        <ViewStyle>

            <h1>Picture Choice Options</h1>

            <ViewStyle>

                <View className="row middle-xs">
                    <View className="col-xs-2">
                    <Box padding={'.5em'}>

                        <UploadStyle
                            action="memory"
                            customRequest={(o) => handleUpload(o)}
                            listType="picture-card"
                            fileList={files}
                            onPreview={(file) => handlePreview(file)}
                            onChange={(e) => uploadChange(0, e)}
                        >
                            {files.length >= 1 ? null : <UploadButton />} 
                        </UploadStyle>
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
                <Modal visible={preview.visible} footer={null} onCancel={() => handleCancel()}>
                    <img alt="example" style={{ width: '100%' }} src={preview.image} />
                </Modal>

            </ViewStyle>

            {
                    activeQuestionOptions.map((option, order) => {
                        return (
                            <View className="row middle-xs">
                                <View className="col-xs-2">
                                    <Box padding={'.5em'}>
                
                                        <UploadStyle
                                            action="memory"
                                            customRequest={(o) => handleUpload(o)}
                                            listType="picture-card"
                                            fileList={files}
                                            onPreview={(file) => handlePreview(file)}
                                            onChange={(e) => uploadChange(order, e)}
                                        >
                                            {files.length >= 1 ? null : <UploadButton />} 
                                        </UploadStyle>
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
                                            X
                                        </div>            
                                    </Box>
                                </View>
                            </View>
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