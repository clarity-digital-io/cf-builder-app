import React from 'react';

import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

export const Select = ({ key, placeholder, options, value, onChange, order, valueField, labelField }) => {

    return (
        <AntSelect key={key} style={{ width: '100%' }} defaultValue={value} onChange={(e) => onChange(e, order)}>
            
            <Option value="">{ placeholder || 'Select' }</Option>

            {
                options.map((option) => {
                    
                    let key = valueField != null ? option[valueField] : option;
                    let value = valueField != null ? option[valueField] : option;
                    let label = labelField != null ? option[labelField] : option;

                    return (
                        <Option key={key} value={value}>{label}</Option>
                    )
                })
            }
            
        </AntSelect>
    )

}

