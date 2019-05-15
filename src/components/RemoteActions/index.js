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
        case 1:
            LCC.callApex(func, params[0], params[1], callback, { escape: true });
            break;
        default:
            break;
    }

}

const mockCall = (func, params, callback) => {

    switch (func) {
        case 'createForm':
            callback(1); 
            break;
        case 'getQuestions':
            callback([{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0 }]); 
            break;
        case 'save': 
            callback([2]);
        case 'saveQuestion':
            callback(2);
        default:
            break;
    }
}

const handler = () => {

}

const error = () => {

}