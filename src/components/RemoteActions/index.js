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
        case 'startup':
            callback({
                Id: 1, 
                Name: 'Clarity Form', 
                Limit__c: 10, 
                End_Date__c: null,
                Connected_Object__c: 'Account',
                Clarity_Form_Style__c: 1, 
                Clarity_Form_Assignment__c: 1,
                Clarity_Form_Style__r: { Background_Color__c: '#333333', Color: '#ffffff', Button_Color__c: '' }, 
                Clarity_Form_Assignment__r: { Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 } 
            }); 
            break;
        case 'updateForm':
            callback({ Id: 1, Name: 'Clarity Form', End_Date__c: null, Connected_Object__c: 'Case', Limit__c: 1000, Clarity_Form_Style__c: 1, Clarity_Form_Assignment__c: 1 })
            break;
        case 'getQuestions':
            callback([{ Id: 1, Type__c: 'RecordGroup', Title__c: 'Record Group', Salesforce_Object__c: 'Case', Order__c: 0, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Logic__c: 'AND' }]); 
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
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }],
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'getQuestionOptions':
            callback([{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 1},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 1}]);
            break; 
        case 'saveFlowDesign':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: true, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'savQuestionWithCriteria':
            callback({
                'Question' : [{ Id: 1, Type__c: 'RecordGroup', Title__c: 'RecordGroup', Order__c: 0, Logic__c: 'OR'  }],
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }]
            });
            break;
        case 'getSObjectsAvailable': 
            callback(['Account', 'Case', 'Contact', 'Opportunity', 'AccountRole']);
            break; 
        case 'getSObjectFields': 
            callback({ Required: {'OwnerId': 'Reference', 'Name': 'Text'}, NotRequired: {'Time': 'Number', 'CustomField': 'Picklist'}});
            break; 
        case 'getUsers':
            callback([{Id: 1, Name: 'Test User1', UserName: 'User1'}, {Id: 2, Name: 'Test User2', UserName: 'User2'}]);
            break; 
        case 'createAssignment':
            callback({Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 });
            break; 
        case 'getAssignmentRules': 
            callback([{ Id: 1, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }]);
            break; 
        case 'saveAssignmentRules':
            callback([]);
            break; 
        case 'updateDesign':
            callback([{ Background_Color__c: '#FFF', Color: '#333', Button_Color__c: '#333' }]);
            break; 
        default:
            break;
    }
}

const handler = () => {

}

const error = () => {

}