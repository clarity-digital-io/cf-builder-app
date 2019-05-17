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
    
    const  [form, setForm] = useState({ Id: null, Name: '', NavState: 'QUESTIONS', State: 'NEW' });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId');

        recordId ? 
            setForm({ Id: recordId, Name: '',  NavState: 'QUESTIONS', State: 'EDIT' }) :
            call("ClarityFormBuilder.createForm", [], (result, e) => createHandler(result, e, setForm))
        
    }, [])

    return (
        <BuilderContext.Provider value={{ form, setForm }}>
            { children }
        </BuilderContext.Provider>
    )
}

const createHandler = (result, e, setForm) => {
    setForm({ Id: result, Name: '', NavState: 'QUESTIONS', State: 'NEW' });
}

const Layout = styled.div`
    background: ${Main.color.white};
    border: 1px solid ${Main.color.light};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 