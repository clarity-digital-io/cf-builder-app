import React, { useState } from 'react';
import { Select, Spin } from 'antd';

const Option = Select.Option;

export const Lookup = ({ question }) => {

    const [search, setSearch] = useState(false);
    const [selection, setSelection] = useState('');
    const [newResults, setNewResults] = useState([]);

    const onChange = () => {

    }

    const onRemoveOption = () => {

    }

    const onSelect = () => {

    }

    return [
        <Select
            mode="multiple"
            labelInValue
            placeholder={question.Placeholder__c}
            notFoundContent={search ? <Spin size="small" /> : null}
            filterOption={false}
            onChange={(value) => onSelect(value)}
            onSearch={(value) => onChange(value)}
            onDeselect={(value) => onRemoveOption(value)}
            style={{ width: '100%' }}
        >
            {newResults.map(d => <Option key={d.id}>{d.label}</Option>)}
        </Select>
    ]

}