import React from 'react';
import { Upload, Icon } from 'antd';

export const Attachments = ({ question }) => {

    const uploadChange = ({ fileList }) => {

    }

    const handleUpload = ({ file, onSuccess }) => {

    }

    return (
        <Upload
            action="memory"
            customRequest={(o) => handleUpload(o)}
            listType="picture-card"
            fileList={files}
            onPreview={(file) => handlePreview(file)}
            onChange={(e) => uploadChange(e)}
        >
            {files.length >= 3 ? null : <UploadButton />}
        </Upload>
    )

}

const UploadButton = () => {
    return (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    )
}