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

    const [activeConnection, setActiveConnection] = useState([]);

    useEffect(() => {

        if(navState == 'MAPPING') {
 
            setLoading(true);

            call(
                "ClarityFormBuilder.getConnectionFieldMapping", 
                [activeConnection.Id, activeConnection.Salesforce_Object__c], 
                (result, e) => mappingResultHandler(result, e, setActiveFieldMapping, setActiveFields, setLoading)
            );

        }
        
    }, [activeConnection])

    const [activeFieldMapping, setActiveFieldMapping] = useState([]);

    const [activeFields, setActiveFields] = useState([]);

    const [connections, setConnections] = useState([]);

    const [assign, setAssignment] = useState({ Id: null, Name: '', Assign__c : null, Default_Assign__c: null });

    const [styles, setStyles] = useState([]); 

    const [style, setStyle] = useState({ Id: null, Color__c: '#333333', Background_Color__c : '#ffff', Columns: '', Multi_Page__c: false });

    const [form, setForm] = useState({Id: null, Name: '', Clarity_Form_Style__c: null, Clarity_Form_Assignment__c: 1, Connected_Object__c: '' });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId') != null ? url.get('recordId') : '';

        call("ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm, setStyle, setAssignment));
        
    }, []);

    const [assignmentRules, setAssignmentRules] = useState([]);

    const [navState, setNavState] = useState('QUESTIONS'); 

    useEffect(() => {

        if(navState == 'DESIGN') {

            setLoading(true);

            call(
                "ClarityFormBuilder.getDesigns", 
                [], 
                (result, e) => designsResultHandler(result, e, setStyles, setLoading)
            )
        }

        if(navState == 'ASSIGNMENTS') {

            setLoading(true);

            if(assign.Id != null) {
                call("ClarityFormBuilder.getAssignmentRules", [form.Clarity_Form_Assignment__c], (result, e) => assignmentRulesHandler(result, e, setAssignmentRules, setLoading));
            } else {
                call("ClarityFormBuilder.createAssignment", [`${form.Name} Assignment`, form.Id], (result, e) => assignmentCreateHandler(result, e, setAssignment, setAssignmentRules, setLoading));
            }

        }

        if(navState == 'CONNECT') {

            setLoading(true);

            call(
                "ClarityFormBuilder.getConnections", 
                [form.Id], 
                (result, e) => connectionsResultHandler(result, e, setConnections, setLoading)
            );

        }

    }, [navState])

    const [sObjects, setSObjects] = useState([]);

    useEffect(() => {

        call("ClarityFormBuilder.getSObjectsAvailable", [], (result, e) => getSObjectsHandler(result, e, setSObjects));
        
    }, [])

    return (
        <BuilderContext.Provider value={{ 
            loading,
            activeFields,
            styles,
            activeConnection, 
            setActiveConnection, 
            activeFieldMapping, 
            setActiveFieldMapping,
            connections, 
            setConnections,
            assign, 
            setAssignment,
            assignmentRules, 
            setAssignmentRules,
            navState, 
            setNavState, 
            form, 
            style, 
            setStyle, 
            setForm, 
            sObjects 
            }}>
            { children }
        </BuilderContext.Provider>
    )
}

const designsResultHandler = (result, e, setStyles, setLoading) => {

    setLoading(false);
    setStyles(result); 

}

const assignmentCreateHandler = (result, e, setAssignment, setAssignmentRules, setLoading) => {

    setLoading(false);
    setAssignment(result); 
    setAssignmentRules([]);

}

const assignmentRulesHandler = (result, e, setAssignmentRules, setLoading) => {

    setAssignmentRules(result); 
    setLoading(false);

}

const createHandler = (result, e, setForm, setStyle, setAssignment) => {

    setForm(form => {
        return { 
            ...form, Id: 
            result.Id, 
            Name: result.Name, 
            Limit__c: result.Limit__c, 
            End_Date__c: result.End_Date__c, 
            Connected_Object__c: result.Connected_Object__c, 
            Clarity_Form_Assignment__c: result.Clarity_Form_Assignment__c, 
            Clarity_Form_Style__c: result.Clarity_Form_Style__c 
        }
    });

    setStyle(style => {
        return { 
            ...style, 
            Id: result.Clarity_Form_Style__c, 
            Multi_Page__c: result.Clarity_Form_Style__r.Multi_Page__c ,
            Background_Image__c: result.Clarity_Form_Style__r.Background_Image__c, 
            Background_Color__c: result.Clarity_Form_Style__r.Background_Color__c, 
            Color__c: result.Clarity_Form_Style__r.Color__c 
        }
    })

    if(result.Clarity_Form_Assignment__c == null) return;

    setAssignment(assignment => {
        return { 
            ...assignment, 
            Id: result.Clarity_Form_Assignment__c, 
            Assign__c: result.Clarity_Form_Assignment__r.Assign__c, 
            Default_Assign__c: result.Clarity_Form_Assignment__r.Default_Assign__c, 
            Name: result.Clarity_Form_Assignment__r.Name
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

const mappingResultHandler = (result, e, setActiveFieldMapping, setActiveFields, setLoading) => {
    setActiveFieldMapping(result.Mapping); 
    setActiveFields(result.Fields); 
    setLoading(false); 
}

const Layout = styled.div`
    background: ${Main.color.white};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 