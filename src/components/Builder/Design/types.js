export const types = [
    {   
        id: 0, 
        active: false, 
        name: 'Connected Object',
        type: 'ConnectedObject'
    },
    {   
        id: 1, 
        active: true, 
        name: 'Multiple Choice',
        type: 'MultipleChoice'
    },
    {
        id: 2, 
        active: true, 
        name: 'Comment',
        type: 'Comment'
    }, 
    {
        id: 3,
        active: true, 
        name: 'Dropdown',
        type: 'Dropdown'
    },  
    {
        id: 4, 
        active: true, 
        name: 'Net Promoter Score',
        type: 'NetPromoterScore'
    }, 
    {
        id: 5, 
        active: true, 
        name: 'Slider',
        type: 'Slider'
    }, 
    {
        id: 6,
        active: true, 
        name: 'Date',
        type: 'Date'
    }, 
    {
        id: 7, 
        active: true, 
        name: 'Email',
        type: 'Email'
    },
    {   
        id: 8, 
        active: true, 
        name: 'Number',
        type: 'Number'
    },
    {   
        id: 9, 
        active: true, 
        name: 'Lookup',
        type: 'Lookup'
    },
    {   
        id: 10, 
        active: true, 
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
        active: true, 
        name: 'Checkbox',
        type: 'Checkbox'
    }, 
    {   
        id: 13, 
        active: true, 
        name: 'Attachments',
        type: 'Attachments'
    }, 
    {   
        id: 14, 
        active: true, 
        name: 'Free Text',
        type: 'FreeText'
    }, 
    {   
        id: 15, 
        active: true, 
        name: 'Picture Choice',
        type: 'PictureChoice'
    },
    {   
        id: 16, 
        active: true, 
        name: 'Input Field',
        type: 'InputField'
    }
];

export const sortedTypes = types.sort((a, b) => {

    if(a.name < b.name) {
        return -1; 
    } 
    
    if(a.name > b.name) {
        return 1;
    }

}).filter(type => type.active);