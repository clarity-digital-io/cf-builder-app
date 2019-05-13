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

    const  [form, setForm] = useState({ Id: null, Name: '' });

    useEffect(() => {

        call("ClarityFormBuilder.createForm", [], (result, e) => resultHandler(result, e, setForm));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ form }}>
            { children }
        </BuilderContext.Provider>
    )
}

const resultHandler = (result, e, setForm) => {
    setForm({ Id: result });
}

const Layout = styled.div`
    background: ${Main.color.white};
    border: 1px solid ${Main.color.light};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 