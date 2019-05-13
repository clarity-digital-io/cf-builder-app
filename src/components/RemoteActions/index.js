import LCC from 'lightning-container';

export const call = (func, params, callback) => {

    process.env.NODE_ENV == 'development' ? mockCall(func, params, callback) : prodCall(func, params, callback); 
    
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
    callback('Test', { Id: 1, Name: 'Test'});
}

const handler = () => {

}

const error = () => {

}