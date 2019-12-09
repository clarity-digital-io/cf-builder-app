import React from 'react';

import { TextStyle, ParagraphStyle } from '../View/fieldstyle'

export const FreeText = ({ question }) => {

    return question.FreeText_Type__c == 'Header' ?
    <TextStyle>{question.Title__c}</TextStyle> :
    <ParagraphStyle>{question.Title__c}</ParagraphStyle>

}
