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

    const [loading, setLoading] = useState(false); 

    const [assignmentRules, setAssignmentRules] = useState([]);

    const [nav, setNavState] = useState({ NavState: 'QUESTIONS' }); 

    useEffect(() => {

        if(nav.NavState == 'ASSIGNMENTS') {
            setLoading(true);
            call("ClarityFormBuilder.getAssignmentRules", [form.Clarity_Form_Assignment__c], (result, e) => assignmentRulesHandler(result, e, setAssignmentRules, setLoading));
        }

    }, [nav])

    const [style, setStyle] = useState({ Id: null, Color__c: '#333333', Background_Color__c : '#ffff', Columns: '', });

    const [form, setForm] = useState({Id: null, Name: '', Clarity_Form_Style__c: null, Clarity_Form_Assignment__c: null });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId') != null ? url.get('recordId') : '';

        call("ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm, setStyle));
        
    }, []);

    const [sObjects, setSObjects] = useState([]);

    useEffect(() => {

        call("ClarityFormBuilder.getSObjectsAvailable", [], (result, e) => getSObjectsHandler(result, e, setSObjects));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ nav, setNavState, form, style, setStyle, setForm, sObjects }}>
            { children }
        </BuilderContext.Provider>
    )
}

const assignmentRulesHandler = (result, e, setAssignmentRules, setLoading) => {

    setLoading(false);
    console.log('assignmentRulesHandler', result); 

}

const createHandler = (result, e, setForm, setStyle) => {

    setForm(form => {
        return { ...form, Id: result.Id, Name: result.Name, Clarity_Form_Assignment__c: result.Clarity_Form_Assignment__c, Clarity_Form_Style__c: result.Clarity_Form_Style__c }
    });

    setStyle(style => {
        return { ...style, Id: result.Clarity_Form_Style__c, Background_Color__c: result.Clarity_Form_Style__r.Background_Color__c, Color__c: result.Clarity_Form_Style__r.Color__c }
    })

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