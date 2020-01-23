import React from 'react';

import { TextStyle, ParagraphStyle } from '../View/fieldstyle'

export const FreeText = ({ question }) => {

    return question.forms__FreeText_Type__c == 'Header' ?
    <TextStyle>{question.forms__Title__c}</TextStyle> :
    <ParagraphStyle>{question.forms__Title__c}</ParagraphStyle>

}
