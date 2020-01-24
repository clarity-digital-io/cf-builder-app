import React from 'react';

import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

export const Select = ({ disabled, key, placeholder, options, value, onChange, order, valueField, labelField, setLabel }) => {

	return (
        <AntSelect placeholder={'Please Select Option'} disabled={disabled} showSearch key={key} style={{ width: '100%' }} defaultValue={value} onChange={(e) => onChange(e, order)}>
            
            {
                options.map((option) => {
                    
                    let key = valueField != null ? option[valueField] : option;
                    let value = valueField != null ? option[valueField] : option;
                    let label = labelField != null ? option[labelField] : option;

										if(setLabel) {
											
											label = option.forms__Record_Group__c != null ?  'Record Group: ' + option.forms__Title__c + ' (' + option.forms__Salesforce_Field__c + ')' : option.forms__Title__c
									
										}

                    return (
                        <Option key={key} value={value}>{label}</Option>
                    )
                })
            }
            
        </AntSelect>
    )

}

