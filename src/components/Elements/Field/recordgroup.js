import React, { useState, useContext, useEffect } from 'react';

import { Card, Spin, Icon, Table, Form } from 'antd';
import { DesignContext } from '../../Context';
import { getType } from '../../Builder/Design/Display/types';

const FormItem = Form.Item;

export const RecordGroup = ({ question }) => {

    const [newItem, addNewItem] = useState(false);

    const [recordQuestion, setRecordQuestion] = useState(question); 
    
    return (
        <Card
            title={question.forms__Title__c}
            actions={
                newItem ?
                [<Icon type="arrow-left" onClick={() => addNewItem(false)} />, <Icon type="save" />] :
                [<Icon type="plus" onClick={() => addNewItem(true)} />]
            }
            style={{ width: '100%' }}
        >

            <RecordBody 
                items={[]} 
                newItem={newItem} 
                question={recordQuestion} 
            />

        </Card>
    )

}

const RecordBody = ({ items, newItem, question }) => {

    const { recordGroup } = useContext(DesignContext);

    const [recordGroupFields, setRecordGroupFields] = useState(recordGroup.get(question.Id) || []);

    const [columns, setColumns] = useState([]);

    useEffect(() => {

        if(recordGroupFields && recordGroupFields != null) {
            setColumns(getRecordColumns(recordGroupFields));
        }

    }, [recordGroupFields])

    return newItem ?
        [
            recordGroupFields.map(question => {
                return <FormItem key={question.Id} label={question.forms__Title__c} required={question.forms__Required__c}>
                    { getType(question) }
                </FormItem>
            })
        ]
        :
        <Table dataSource={items} columns={columns} />

}

const getRecordColumns = (recordGroupFields) => {

    return recordGroupFields.map(question => {

        return {
            title: question.forms__Salesforce_Field__c,
            dataIndex: question.forms__Salesforce_Field__c, 
            key: question.forms__Salesforce_Field__c
        }

    })
    
}