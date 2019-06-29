import React, { useState } from 'react';

import { call } from '../../../RemoteActions'; 

import { EditContext } from '../../../Context';

export const EditProvider = ({ children }) => {

    const [activeRecordGroup, setActiveRecordGroup] = useState([]); 

    return (
        <EditContext.Provider value={{ activeRecordGroup, setActiveRecordGroup }}>
            { children }
        </EditContext.Provider>
    )
    
}