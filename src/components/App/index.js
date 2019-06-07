import React, { useState, useEffect } from 'react';
import { call } from '../RemoteActions';

import { BuilderContext } from '../Context';
import styled from 'styled-components';
import Main from '../Elements/Theme';

const App = ({ children }) => {

    return (
        <Layout>
            <BuilderProvider>
                { children }
            </BuilderProvider>
        </Layout>
    )

}

const BuilderProvider = ({ children }) => {
    
    const [form, setForm] = useState({ 
        Id                  : null, 
        Name                : '', 
        Color__c            : '#333', 
        Background_Color__c : '#ffff', 
        Columns             : '', 
        NavState            : 'QUESTIONS', 
        State               : 'NEW' 
    });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId') != null ? url.get('recordId') : '';

        call("ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm));
        
    }, [])

    const [sObjects, setSObjects] = useState([]);

    useEffect(() => {

        call("ClarityFormBuilder.getSObjectsAvailable", [], (result, e) => getSObjectsHandler(result, e, setSObjects));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ form, setForm, sObjects }}>
            { children }
        </BuilderContext.Provider>
    )
}

const createHandler = (result, e, setForm) => {
    console.log(result);
    setForm(form => {
        return { ...form, Id: result.Id, Name: result.Name, NavState: 'QUESTIONS', State: 'NEW' }
    });
}

const getSObjectsHandler = (result, e, setSObjects) => {
    setSObjects(result.sort()); 
}

const Layout = styled.div`
    background: ${Main.color.white};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 