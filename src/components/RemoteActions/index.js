import LCC from 'lightning-container';

export const call = (func, params, callback) => {

    process.env.NODE_ENV == 'development' ? mockCall(func.split('.')[1], params, callback) : prodCall(func, params, callback); 
    
}

const prodCall = (func, params, callback) => {
    
    switch (params.length) {
        case 0:
            LCC.callApex(func, callback, { escape: true });
            break;
        case 1:
            LCC.callApex(func, params[0], callback, { escape: true });
            break;
        case 2:
            LCC.callApex(func, params[0], params[1], callback, { escape: true });
            break;
        default:
            break;
    }

}

const mockCall = (func, params, callback) => {
    let date = new Date();
    let timestamp = date.getTime();
    switch (func) {
        case 'createForm':
            callback(1); 
            break;
        case 'getQuestions':
            callback([{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0 }]); 
            break;
        case 'save': 
            callback([timestamp]);
            break;
        case 'saveQuestionWithOptions': 
            callback({
                'Question': [{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0  }], 
                'Options': [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}]
            });
            break;
        case 'saveQuestion':
            callback(2);
            break;
        case 'deleteQuestion':
            callback([{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0 }]);
            break;
        case 'getQuestionEditDetails':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'saveFlowDesign':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: true, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'getLookupsAvailable': 
            callback(['Account', 'Case', 'Contact', 'Opportunity', 'AccountRole']);
            break; 
        default:
            break;
    }
}

const handler = () => {

}

const error = () => {

}