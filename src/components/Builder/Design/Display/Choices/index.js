import React from 'react';

// import { MultipleChoice } from './multiple'; 
// import { Comment } from './comment'; 
// import { Slider } from './slider'; 
// import { Number } from './number'; 
// import { Dropdown } from './dropdown';

export const getType = (question) => {

    switch (question.Type__c) {
        case 'MultipleChoice':
            return <div>MultipleChoice</div>
            break; 
        case 'Dropdown':
            return <div>Dropdown</div>
            break;
        case 'Ranking':
            return <div>Ranking</div>
            break;
        case 'Checkbox':
            return <div>Checkbox</div>
            break;
        case 'Comment':
            return <div>Comment</div>
            break;
        case 'Star':
            return <div>Star</div>
            break; 
        case 'NetPromoterScore':
            return <div>NetPromoterScore</div>
            break;
        case 'Slider':
            return <div>Slider</div>
            break;
        case 'Email':
            return <div>Email</div>
            break;
        case 'Payment':
            return <div>Payment</div>
            break; 
        case 'Number':
            return <div>Number</div>
            break;
        default:
            return <div>{ question.Type__c }</div>
            break;
    }

}
