import React, { useContext } from 'react';
import { DesignContext } from '../../../Context';

import { Multiple } from './multiple'; 
// import { Comment } from './comment'; 

export const EditQuestion = ({ type }) => {

    const getQuestionType = (type) => {

        switch (type) {
            case 'MultipleChoice':
            case 'Dropdown':
            case 'Ranking':
            case 'Checkbox':
                return <Multiple />
                break;
            case 'Comment':
                return <div>Comment</div>
                break;
            case 'Star':
                return <div>star</div>
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
            default:
                return <div>{ type }</div>
                break;
        }

    }

    return getQuestionType(type)
    
}
