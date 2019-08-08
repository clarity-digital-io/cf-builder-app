import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export const Dropdown = ({ question }) => {

    return (

        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder={question.Placeholder__c}
            optionFilterProp="children"
            onChange={(e) => onSelect(e)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
                
            <Option value=''>Select an option</Option>

            {
                question.Clarity_Form_Question_Options__r.map(option => {
                    return <Option value={option.value}>{option.label}</Option>
                })
            }

        </Select>

    )

}
