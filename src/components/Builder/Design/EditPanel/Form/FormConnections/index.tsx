import React, { Dispatch, useCallback, useEffect, useState } from 'react';

import { Modal, Checkbox, Button, Combobox, comboboxFilterAndLimit, Icon } from "@salesforce/design-system-react";
import { useBuilderContext } from '../../../../../../context/BuilderContext';
import { useSetupContext } from '../../../../../../context/SetupContext';
import { Form_Connection__c } from '../../../../../../utils/types/sObjects';
import { ComboSObject } from '../../../../../../reducers/SetupProvider';
import { ConnectionTabs } from './tabs';

export const FormConnections = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: Dispatch<boolean> }) => {

  const { formConnectionId, formConnections, handleUpdateFormConnections } = useBuilderContext();

  const handleNewRecordCheck = (checked: boolean) => {
    if (!formConnectionId) return;
    const _updatedFormConnections = formConnections.map((_formConnection: Form_Connection__c) => {
      if (_formConnection.id === formConnectionId) {
        return { ..._formConnection, cforms__New__c: checked }
      } else {
        return _formConnection
      }
    })
    handleUpdateFormConnections(_updatedFormConnections)
  }

  return (
    <div className="slds-form-element__control">
      <Modal
        size="large"
        isOpen={isOpen}
        footer={[
          <Button key={'cancel'} label="Cancel" onClick={() => setOpen(!isOpen)} />,
          <Button key={'done'} label="Done" variant="brand" onClick={() => setOpen(!isOpen)} />,
        ]}
        onRequestClose={() => setOpen(!isOpen)}
        heading={"New Form Connection"}
      >
        <section className="slds-p-around_large">
          <div className="slds-form-element slds-m-bottom_large">
            <SObjectLookup />
          </div>
          <div className="slds-form-element slds-m-bottom_large">
            <Checkbox
              labels={{
                label: 'Create New Record',
              }}
              checked={formConnections.find((_formConnection: Form_Connection__c) => _formConnection.id === formConnectionId)?.cforms__New__c}
              id="create-new-record"
              variant="toggle"
              ch
              onChange={(e: any) => {
                handleNewRecordCheck(e.target.checked)
              }}
            />
          </div>

          <div className="slds-form-element slds-m-bottom_large">
            <ConnectionTabs />
          </div>
        </section>
      </Modal>
    </div>
  );

}

const SObjectLookup = () => {

  const { sObjects } = useSetupContext();

  const { formConnectionId, formConnections, handleUpdateFormConnections } = useBuilderContext();

  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboSObject[]>([])

  useEffect(() => {
    if (formConnectionId && formConnections.length > 0) {
      const _activeConnection = formConnections.find((_formConnection: Form_Connection__c) => _formConnection.id === formConnectionId)
      if (!_activeConnection) return;
      const _activeInputValue = _activeConnection.cforms__Salesforce_Object__c;
      setInputValue(_activeInputValue);
      setSelection(sObjects.filter(sObject => sObject.type === _activeConnection.cforms__Salesforce_Object__c));
    }
  }, [formConnectionId, formConnections])

  // need id to be able to update the one where working with so other components can update based on this
  const handleSetSalesforceObject = useCallback(() => {
    if (selection.length > 0 && selection[0] && selection[0].type && inputValue == '') {
      if (!formConnectionId) return;
      const _updatedFormConnections = formConnections.map((_formConnection: Form_Connection__c) => {
        if (_formConnection.id === formConnectionId) {
          return { ..._formConnection, cforms__Salesforce_Object__c: selection[0].type }
        } else {
          return _formConnection
        }
      })
      handleUpdateFormConnections(_updatedFormConnections)

    }
  }, [selection, formConnectionId, formConnections, inputValue, handleUpdateFormConnections])

  useEffect(() => {
    if (selection.length > 0 && selection[0]) {
      handleSetSalesforceObject()
    }
  }, [selection, inputValue])

  return <Combobox
    id="sObjects"
    events={{
      onChange: (e, { value }) => setInputValue(value),
      onRequestRemoveSelectedOption: (event, data) => {
        setInputValue('');
        setSelection(data.selection);
      },
      onSelect: (e, data) => {
        setInputValue('');
        setSelection(data.selection);
      }
    }}
    labels={{
      label: 'Form Connection sObject',
      placeholder: 'Select an sObject'
    }}
    options={comboboxFilterAndLimit({
      inputValue: inputValue,
      options: sObjects,
      selection: selection,
    })}
    required
    selection={selection}
    value={inputValue} // add check for has selection option
    variant="inline-listbox"
  />
}