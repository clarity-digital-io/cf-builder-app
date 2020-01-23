import React, { useContext } from 'react';
import { Select } from 'antd';
import { DesignContext } from '../../Context';

const Option = Select.Option;

export const Dropdown = ({ question }) => {

    const { questionOptions } = useContext(DesignContext); 

    return (

        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder={question.forms__Placeholder__c}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
                
            <Option value=''>Select an option</Option>

            {
                questionOptions.get(question.Id) != null ? 
                    questionOptions.get(question.Id).map(option => {
                        return <Option value={option.Id}>{option.forms__Label__c}</Option>
                    }): 
                    null
            }

        </Select>

    )

}
