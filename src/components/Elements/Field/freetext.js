import React from 'react';

import { TextStyle } from '../View/fieldstyle'

export const FreeText = ({ question }) => {

    return <TextStyle>{question.Title__c}</TextStyle>

}
