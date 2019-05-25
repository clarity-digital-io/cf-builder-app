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
    
    const [form, setForm] = useState({ Id: null, Name: '', NavState: 'QUESTIONS', State: 'NEW' });

    const [lookups, setLookups] = useState([]);

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId');
        console.log(recordId);
        call("ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm));
        console.log('startup');
        call("ClarityFormBuilder.getLookupsAvailable", [], (result, e) => createLookupsHandler(result, e, setLookups));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ form, setForm, lookups }}>
            { children }
        </BuilderContext.Provider>
    )
}

const createHandler = (result, e, setForm) => {
    console.log(result);
    setForm({ Id: result.Id, Name: result.Name, NavState: 'QUESTIONS', State: 'NEW' });
}

const createLookupsHandler = (result, e, setLookups) => {
    setLookups(result); 
}

const Layout = styled.div`
    background: ${Main.color.white};
    border: 1px solid ${Main.color.light};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 