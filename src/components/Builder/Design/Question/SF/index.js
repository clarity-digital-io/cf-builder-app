import React, { useEffect, useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';

import CloseIcon from '../../../../Elements/Icons/close';

import { Select } from '../../../../Elements/Select';
import { Button } from '../../../../Elements/Button';

export const SalesforceFields = () => {

    const { activeRecordGroup, setActiveRecordGroup, setSObjectEdit, requiredFields } = useContext(EditContext); 
    const { recordGroup, activeQuestion } = useContext(DesignContext); 

    useEffect(() => {
				setActiveRecordGroup(active => {
					return recordGroup.get(activeQuestion.Id) != null ? recordGroup.get(activeQuestion.Id) : [];
				})
        setSObjectEdit(activeQuestion.forms__Type__c);

    }, []);

    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>{ activeQuestion.forms__Type__c }: { activeQuestion.forms__Salesforce_Object__c } </h1>

                        <ViewStyle>

                            <p>
                                { activeQuestion.forms__Title__c }
                            </p>

                        </ViewStyle>

                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>Salesforce Fields</h1>

                        <SalesforceSelects 
                            records={activeRecordGroup} 
                            setActiveRecordGroup={setActiveRecordGroup} 
                            relatedId={activeQuestion.Id} 
                            formId={activeQuestion.forms__Clarity_Form__c}
                        /> 

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = ({ records, setActiveRecordGroup, relatedId, formId }) => {
 
    return [
        <ControlSelects key={'Select'} records={records} />,
        <ControlAddRow key={'Add'} setActiveRecordGroup={setActiveRecordGroup} relatedId={relatedId} formId={formId} />
    ]

}

const ControlSelects = ({ records }) => {

    return records.map((row, i) => {
        return <ControlSelect key={row.forms__Order__c} order={i} row={row} />
    });

}

const ControlSelect = ({ order, row }) => {

    const { setActiveRecordGroup, additionalFields, requiredFields } = useContext(EditContext); 

    const { setQuestionState, setActiveQuestion } = useContext(DesignContext); 

    const edit = (state) => {

        setQuestionState(state);
        setActiveQuestion(row);

    }

		const setSelection = (value, order) => {

        setActiveRecordGroup(records => {

            let newFields = records.map((record, i) => {

								let val = additionalFields.hasOwnProperty(value) ? additionalFields[value] : '';
								
								if(val == '') return record; 
                
                let fieldType = Object.keys(val)[0];

                let sObject = null; 

                if(val.hasOwnProperty('REFERENCE')) {
                    sObject = val['REFERENCE']; 
                }

                if(i == order) {
                    return { ...record, forms__Salesforce_Field__c: value, forms__Type__c: fieldType, forms__Lookup__c: sObject }
                }

                return record; 

            });


            return newFields; 
        })

    }

    const removeRow = (order) => {

        setActiveRecordGroup(activeRecordGroup => {

            let newRows = activeRecordGroup.filter((rec, i) => {
                if(i != order) {
                    return rec; 
                }
            });

            return newRows; 

        })

		}
		
		const closeStyle = {
			height: '60%',
			width: '60%',
		};

		return (
        <View className="row middle-xs">
            <View className="col-xs-1">
                <Box padding='.5em'>
                    <span id="center">{ order + 1 }</span>
                </Box>                
            </View>

            <View className="col-xs-4">
                <Box padding='.5em'> 
										<Select 
											disabled={row.forms__RG_Required__c} 
											key={row.forms__Order__c} 
											value={row.forms__Salesforce_Field__c} 
											options={Object.keys(requiredFields).concat(Object.keys(additionalFields))} 
											onChange={(data) => setSelection(data[0].value, row.forms__Order__c)}
										/>
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 

                    {
                        <Button disabled={row.forms__RG_Required__c} onClick={() => edit('EDIT')}>Edit</Button>
                    }

                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 

                    {
                        row.Id != null && !row.forms__RG_Required__c? 
                        <Button add onClick={() => edit('LOGIC')}>Logic</Button> :
                        <Button disabled>Logic</Button>
                    }

                </Box>
            </View>            
            <View className="col-xs-1">
                <Box padding='.5em'> 

                    {
                        !row.forms__RG_Required__c ? 
                        <div style={closeStyle} disabled={true} onClick={() => removeRow(order)}>
                          <CloseIcon />
                        </div> :
                        null
                    }

                </Box>
            </View>
        </View>
    )
    
}

const ControlAddRow = ({ setActiveRecordGroup, relatedId, formId }) => {

    const add = () => {
 
        setActiveRecordGroup(records => {   
            return records.concat([
							{ 
								forms__Clarity_Form__c: formId, 
								forms__Logic__c: 'AND', 
								forms__Type__c: '', 
								forms__Title__c: '', 
								forms__Salesforce_Field__c: '', 
								forms__Record_Group__c: relatedId, 
								forms__Order__c: records.length, 
								forms__Page__c: 0 
							}
						]);
        })

    }

    return (
        <View className="row center-xs middle-xs">
            <View className="col-xs-1">

                <Button add onClick={() => add()}>&#43;</Button>

            </View>
            <View className="col-xs-11">


            </View>
        </View>
    )
    
}
