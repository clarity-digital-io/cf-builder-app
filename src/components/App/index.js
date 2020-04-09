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

    const [assign, setAssignment] = useState({ Id: null, Name: '', forms__Assign__c : null, forms__Default_Assign__c: null });

    const [styles, setStyles] = useState([]); 

    const [style, setStyle] = useState({ Id: null, forms__Color__c: '#333333', forms__Background_Color__c : '#ffff', Columns: '', forms__Multi_Page__c: false });

    const [form, setForm] = useState({Id: null, Name: '', forms__Clarity_Form_Style__c: null, forms__Clarity_Form_Assignment__c: 1, forms__Connected_Object__c: '', forms__Status__c: '' });

    useEffect(() => {

        let url = new URLSearchParams(window.location.search);

        let recordId = url.get('recordId');

        call(setError, "ClarityFormBuilder.startup", [recordId], (result, e) => createHandler(result, e, setForm, setStyle, setAssignment));
        
    }, []);

    const [assignmentRules, setAssignmentRules] = useState([]);

    const [navState, setNavState] = useState('QUESTIONS'); 

    useEffect(() => {

        if(navState == 'DESIGN') {

            setLoading(true);

            call(
								setError,
                "ClarityFormBuilder.getDesigns", 
                [], 
                (result, e) => designsResultHandler(result, e, setStyles, setLoading)
            )
        }

        if(navState == 'ASSIGNMENTS') {

            setLoading(true);

            if(assign.Id != null) {
                call(
										setError,
                    "ClarityFormBuilder.getAssignmentRules", 
                    [form.forms__Clarity_Form_Assignment__c], 
                    (result, e) => assignmentRulesHandler(result, e, setAssignmentRules, setLoading)
                );
            } else {
                StatusHandler(
                    form.forms__Status__c,
                    () => setLoading(false),
                    () => call(
												setError,
                        "ClarityFormBuilder.createAssignment", 
                        [`${form.Name} Assignment`, form.Id], 
                        (result, e) => assignmentCreateHandler(result, e, setForm, setAssignment, setAssignmentRules, setLoading)
										),
										null,
										setError
                )
            }

        }

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
            styles,
            activeConnection, 
            setActiveConnection, 
            activeFieldMapping, 
            setActiveFieldMapping,
            activeFieldPrefills, 
            setActiveFieldPrefills,
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

const assignmentCreateHandler = (result, e, setForm, setAssignment, setAssignmentRules, setLoading) => {

    setLoading(false);
    setAssignment(result); 
    setAssignmentRules([]);
    setForm(form => {
        return { 
            ...form, 
            forms__Clarity_Form_Assignment__c: result.Id
        }
    });

}

const assignmentRulesHandler = (result, e, setAssignmentRules, setLoading) => {

    setAssignmentRules(result); 
    setLoading(false);

}

const createHandler = (result, e, setForm, setStyle, setAssignment) => {
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
            forms__Clarity_Form_Assignment__c: result.forms__Clarity_Form_Assignment__c, 
            forms__Clarity_Form_Style__c: result.forms__Clarity_Form_Style__c, 
            forms__Status__c: result.forms__Status__c
        }
    });

    setStyle(style => {
        return { 
            ...style, 
            Id: result.forms__Clarity_Form_Style__c, 
            forms__Multi_Page__c: result.forms__Clarity_Form_Style__r.forms__Multi_Page__c ,
            forms__Background_Image__c: result.forms__Clarity_Form_Style__r.forms__Background_Image__c, 
            forms__Background_Color__c: result.forms__Clarity_Form_Style__r.forms__Background_Color__c, 
            forms__Color__c: result.forms__Clarity_Form_Style__r.forms__Color__c 
        }
    })

    if(result.forms__Clarity_Form_Assignment__c == null) return;

    setAssignment(assignment => {
        return { 
            ...assignment, 
            Id: result.forms__Clarity_Form_Assignment__c, 
            forms__Assign__c: result.forms__Clarity_Form_Assignment__r.forms__Assign__c, 
            forms__Default_Assign__c: result.forms__Clarity_Form_Assignment__r.forms__Default_Assign__c, 
            Name: result.forms__Clarity_Form_Assignment__r.Name
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