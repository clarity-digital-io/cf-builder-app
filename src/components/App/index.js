import React, { useState, useEffect } from 'react';
import { call } from '../RemoteActions';

import { BuilderContext } from '../Context';
import styled from 'styled-components';
import Main from '../Elements/Theme';
import { StatusHandler } from '../Elements/Notification';

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

		const [error, setError] = useState({ error: '', open: false }); 

		const [previewMode, setPreviewMode] = useState({ active: false, desktop: false }); 

    const [loading, setLoading] = useState(false); 

    const [activeConnection, setActiveConnection] = useState([]);

    useEffect(() => {

        if(navState == 'MAPPING') {
 
            setLoading(true);

            call(
								setError,
                "ClarityFormBuilder.getConnectionFieldMapping", 
                [activeConnection.Id, activeConnection.forms__Salesforce_Object__c], 
                (result, e) => mappingResultHandler(result, e, setActiveFieldMapping, setActiveFieldPrefills, setActiveFields, setLoading)
            );

        }
        
    }, [activeConnection])

    const [activeFieldMapping, setActiveFieldMapping] = useState([]);

    const [activeFieldPrefills, setActiveFieldPrefills] = useState([]);

    const [activeFields, setActiveFields] = useState([]);

    const [connections, setConnections] = useState([]);

    const [form, setForm] = useState({Id: null, Name: '', forms__Connected_Object__c: '', forms__Status__c: '' });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId');

        call(setError, "ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm));
        
    }, []);

    const [navState, setNavState] = useState('QUESTIONS'); 

    useEffect(() => {

        if(navState == 'CONNECT') {

            setLoading(true);

            call(
								setError,
                "ClarityFormBuilder.getConnections", 
                [form.Id], 
                (result, e) => connectionsResultHandler(result, e, setConnections, setLoading)
            );

        }

    }, [navState])

    const [sObjects, setSObjects] = useState([]);

    useEffect(() => {

        call(setError, "ClarityFormBuilder.getSObjectsAvailable", [], (result, e) => getSObjectsHandler(result, e, setSObjects));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ 
						error, 
						setError,
						previewMode, 
						setPreviewMode,
            loading,
            setLoading,
            activeFields,
            activeConnection, 
            setActiveConnection, 
            activeFieldMapping, 
            setActiveFieldMapping,
            activeFieldPrefills, 
            setActiveFieldPrefills,
            connections, 
            setConnections,
            navState, 
            setNavState, 
            form, 
            setForm, 
            sObjects 
            }}>
            { children }
        </BuilderContext.Provider>
    )
}

const createHandler = (result, e, setForm) => {
    let convertedDate = new Date(result.forms__End_Date__c);
    let year = convertedDate.getFullYear();
    let dateMonth = convertedDate.getMonth()
    let month = dateMonth < 10 ? '0' + (dateMonth + 1) : dateMonth;
    let day = convertedDate.getDate() + 1; 
    let stringDate = year + '-' + month + '-' + day;

    setForm(form => {
        return { 
            ...form, 
            Id: result.Id, 
            Name: result.Name, 
            forms__Limit__c: result.forms__Limit__c, 
            forms__Connected_Object__c: result.forms__Connected_Object__c, 
						forms__Status__c: result.forms__Status__c,
						forms__Multi_Page__c: true
        }
    });

}

const getSObjectsHandler = (result, e, setSObjects) => {
    setSObjects(result.sort()); 
}

const connectionsResultHandler = (result, e, setConnections, setLoading) => {
    setConnections(result); 
    setLoading(false); 
}

const mappingResultHandler = (result, e, setActiveFieldMapping, setActiveFieldPrefills, setActiveFields, setLoading) => {
    setActiveFieldMapping(result.Mapping); 
    setActiveFieldPrefills(result.Prefills);
    setActiveFields(result.Fields); 
    setLoading(false); 
}

const Layout = styled.div`
    background: ${Main.color.white};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 