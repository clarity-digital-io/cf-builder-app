import React, { useCallback, useEffect, useState } from 'react';

import { Tabs, TabsPanel } from "@salesforce/design-system-react";
import { useBuilderContext } from '../../../../../../context/BuilderContext';
import { BuilderController } from '../../../../../../utils/constants/methods';
import { call } from '../../../../../../query';
import { Form_Connection__c, Question__c } from '../../../../../../utils/types/sObjects';
import { FieldMap } from '../../../../../../utils/constants/fields';
import { ComboQuestionField, ComboSObjectField } from '../../../../../../utils/types/fields';
import { Prefill } from './FormConnectionFields/prefill';
import { FieldMapping } from './FormConnectionFields/mapping';

export const ConnectionTabs = () => {

  const { formConnections, formConnectionId, allQuestions } = useBuilderContext();

  const [_questions, _setQuestions] = useState<Array<ComboQuestionField>>([])
  const [sObjectFields, setSObjectFields] = useState<Array<ComboSObjectField>>([])

  const [activeFormConnection, setActiveFormConnection] = useState<Form_Connection__c>();

  useEffect(() => {
    if (formConnectionId && formConnections.length > 0) {
      const _activeFormConnection = formConnections.find((_formConnection: Form_Connection__c) => _formConnection.id === formConnectionId)
      setActiveFormConnection(_activeFormConnection);
    }
  }, [formConnectionId, formConnections])

  const requestSObjectFields = useCallback(async () => {
    if (activeFormConnection?.cforms__Salesforce_Object__c && formConnectionId) {

      const _sObjectFields = await call(BuilderController.getSObjectFields, [activeFormConnection?.cforms__Salesforce_Object__c]);
      setSObjectFields(_sObjectFields.map((field: FieldMap) => ({ id: field.field, label: field.field, type: field.type })));
    }
  }, [activeFormConnection, formConnectionId])

  useEffect(() => {
    if (activeFormConnection && formConnectionId) {
      requestSObjectFields();
    }
  }, [activeFormConnection, formConnectionId])

  const formatQuestions = useCallback(() => {
    const _formattedQuestions: ComboQuestionField[] = allQuestions.map((question: Question__c, index: number) => {
      return {
        id: question.id,
        label: question.cforms__Title__c,
        type: question.cforms__Type__c
      }
    });
    _setQuestions(_formattedQuestions)
  }, [allQuestions]);

  useEffect(() => {
    if (allQuestions.length > 0) {
      formatQuestions()
    }
  }, [allQuestions])

  return <Tabs id="tabs-connections" defaultSelectedIndex={1}>
    <TabsPanel disabled={activeFormConnection?.cforms__New__c} label={activeFormConnection?.cforms__New__c ? "Prefill *Not Available" : "Prefill"}>
      <Prefill questions={_questions} sObjectFields={sObjectFields} />
    </TabsPanel>
    <TabsPanel label="Field Mapping">
      <FieldMapping questions={_questions} sObjectFields={sObjectFields} />
    </TabsPanel>
  </Tabs>
}
