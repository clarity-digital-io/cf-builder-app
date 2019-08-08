import React, { useState } from 'react';

import { Card, Spin, Icon } from 'antd';

export const RecordGroup = ({ question }) => {
    
    const [newItem, addNewItem] = useState(false);

    return (
        <Card
            title={question.Title__c}
            actions={
                newItem ?
                [<Icon type="arrow-left" onClick={() => addNewItem(false)} />, <Icon type="save" />] :
                [<Icon type="plus" onClick={() => addNewItem(true)} />]
            }
            style={{ width: '100%' }}
        >
            <Spin size="small" /> 
        </Card>
    )

}