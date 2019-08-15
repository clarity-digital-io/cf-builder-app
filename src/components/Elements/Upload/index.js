import React, { useState } from 'react';
import styled from 'styled-components';

import { Upload as AntUpload, Icon, Modal } from 'antd';

export const Upload = ({ files, setFiles, onChange }) => {

    const [preview, setPreview] = useState({ image: null, visible: false });

    const uploadChange = ({ fileList }) => {
        
        setFiles(fileList)

    }

    const handleUpload = ({ file, onSuccess }) => {

        let reader = new window.FileReader();

        reader.readAsDataURL(file);

        reader.onload = (...args) => {
    
            let fileContents = reader.result;

            onSuccess('done', file);

            onChange(fileContents)

        };
    }
    const handlePreview = (file) => {
        setPreview({ image: file.thumbUrl, visible: true })
    }

    const handleCancel = (file) => {
        setPreview(preview => {
            return { ...preview, visible: false }
        })
    }

    return [
        <UploadStyle
            action="memory"
            customRequest={(o) => handleUpload(o)}
            listType="picture-card"
            onPreview={(f) => handlePreview(f)}
            fileList={files}
            onChange={(e) => uploadChange(e)}
        >
            {files.length >= 1 ? null : <UploadButton />} 
        </UploadStyle>,
        <Modal visible={preview.visible} footer={null} onCancel={() => handleCancel()}>
            <img alt="example" style={{ width: '100%' }} src={preview.image} />
        </Modal>
    ]
}

const UploadButton = () => {
    return (
        <div>
            <Icon type="plus" />
        </div>
    )
}

const UploadStyle = styled(AntUpload)`
    
    display: block !important;

    .ant-upload, .ant-upload-list-item {
        height: 100% !important; 
    }

`
