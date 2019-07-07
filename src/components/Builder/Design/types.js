export const types = [
    {   
        id: 0, 
        active: false, 
        name: 'Connected Object',
        type: 'ConnectedObject'
    },
    {   
        id: 1, 
        active: false, 
        name: 'Multiple Choice',
        type: 'MultipleChoice'
    },
    {
        id: 2, 
        active: false, 
        name: 'Comment',
        type: 'Comment'
    }, 
    {
        id: 3,
        active: false, 
        name: 'Dropdown',
        type: 'Dropdown'
    },  
    {
        id: 4, 
        active: false, 
        name: 'Net Promoter Score',
        type: 'NetPromoterScore'
    }, 
    {
        id: 5, 
        active: false, 
        name: 'Slider',
        type: 'Slider'
    }, 
    {
        id: 6,
        active: false, 
        name: 'Date',
        type: 'Date'
    }, 
    {
        id: 7, 
        active: false, 
        name: 'Email',
        type: 'Email'
    },
    {   
        id: 8, 
        active: false, 
        name: 'Number',
        type: 'Number'
    },
    {   
        id: 9, 
        active: false, 
        name: 'Lookup',
        type: 'Lookup'
    },
    {   
        id: 10, 
        active: false, 
        name: 'Record Group',
        type: 'RecordGroup'
    },
    {   
        id: 11, 
        active: false, 
        name: 'Image',
        type: 'Image'
    },
    {   
        id: 12, 
        active: false, 
        name: 'Checkbox',
        type: 'Checkbox'
    }, 
    {   
        id: 13, 
        active: false, 
        name: 'Attachments',
        type: 'Attachments'
    }, 
    {   
        id: 14, 
        active: false, 
        name: 'Text',
        type: 'Text'
    },
    {   
        id: 15, 
        active: false, 
        name: 'Page Break',
        type: 'PageBreak'
    }
];

export const sortedTypes = types.sort((a, b) => {

    if(a.name < b.name) {
        return -1; 
    } 
    
    if(a.name > b.name) {
        return 1;
    }

});