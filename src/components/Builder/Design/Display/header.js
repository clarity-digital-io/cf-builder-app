import React, { useContext, useState } from 'react';
import LCC from 'lightning-container';

import { call } from '../../../RemoteActions';

import styled, { css } from 'styled-components';
import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { BuilderContext, DesignContext } from '../../../Context';

import { Modal, Button as AntButton, message } from 'antd';

export const Header = () => {

    const [publishCheck, setPublishCheck] = useState(false);

    const [type, setType] = useState(null);

    const { form, style, setForm, setLoading } = useContext(BuilderContext); 

    const { setAddPageUpdate, update, questions } = useContext(DesignContext); 

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    const publish = () => {
        if(questions.length > 0) {

            setType('Publish');

            setPublishCheck(true);

        } else {

            setType('Publish Error');   
            
            setPublishCheck(true); 

        }
    }

    const handleCancel = () => {
        
        setPublishCheck(false); 

    }

    const handlePublish = () => {
        
        setLoading(true); 

        call(
            "ClarityFormBuilder.updateStatus", 
            [form.Id, 'Published'], 
            (result, e) => publishHandler(result, e, setLoading, setPublishCheck, setForm)
        );

    }

    const handleDraft = () => {
        
        setLoading(true); 

        call(
            "ClarityFormBuilder.updateStatus", 
            [form.Id, 'Draft'], 
            (result, e) => publishHandler(result, e, setLoading, setPublishCheck, setForm)
        );

    }

    return [
        <View className="row middle-xs" header space>

            <View className="col-xs-6">

                <Title>{ form.Name }</Title>

                <Button small update>{ update ? 'Saving... ' : 'Saved' }</Button>

                <Button small status>{ form.Status__c } </Button>

            </View>

            <View className="col-xs-6">

                <View className="row end-xs">

                    {
                        style.Multi_Page__c ? 
                        <View className="col-xs-2">
                            <Button small add onClick={() => setAddPageUpdate(true)}>Add Page</Button>
                        </View> :
                        null
                    }
                    
                    <View className="col-xs-4">

                        <Button small preview onClick={() => preview()}>Preview</Button>

                        {
                            form.Status__c == 'Draft' ? 
                            <Button small publish onClick={() => publish()}>Publish Form</Button> :
                            <Button small publish onClick={() => draft()}>Set to Draft</Button>
                        }

                    </View>

                </View>

            </View>
            
        </View>,
        <Modal
            visible={publishCheck}
            footer={<BuildFooter handleCancel={handleCancel} handleSave={handlePublish} type={type} />}
        >
            <BuildMessage type={type} />
        </Modal>
    ]

}

const BuildFooter = ({ type, handleCancel, handleSave }) => {

    const getFooter = (type) => {

        switch (type) {
            case 'Publish':
                return ([<AntButton key="back" onClick={() => handleCancel()}>
                            Cancel
                        </AntButton>,
                        <AntButton key="submit" type="primary" onClick={() => handleSave()}>
                            Publish
                        </AntButton>])
                break;
            default:
                return (<AntButton key="back" onClick={() => handleCancel()}>
                            Cancel
                        </AntButton>)
                break;
        }

    }

    return getFooter(type);

}

const BuildMessage = ({ type }) => {

    const getMessage = (type) => {

        switch (type) {
            case 'Publish':
                return (<div>
                            <h1>
                                Are you sure you want to publish this form?
                            </h1>
                            <p>
                                Updates to the form are only possible in Draft mode.
                            </p>
                        </div>)
                break;
            default:
                return (<div>
                            <h1>
                                Unable to publish form without questions.
                            </h1>
                            <p>
                                Please add a question before publishing this form.
                            </p>
                        </div>)
                break;
        }
        
    }

    return getMessage(type);

}

const publishHandler = (result, e, setLoading, setPublishCheck, setForm) => {
    console.log('result', result); 
    setLoading(false); 

    setPublishCheck(false); 

    if(result.Status == 'Success') {

        setForm(form => {
            return { ...form, Status__c: result.Form.Status__c }
        });

    }
}

const Title = styled.div`
    font-size: 1em; 
    display: inline; 
    font-weight: 900; 
    margin-right: .5em;
`