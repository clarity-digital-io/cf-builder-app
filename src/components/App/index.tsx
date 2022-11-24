import React, { useState, useEffect } from "react";
import { call } from "../RemoteActions";

import { BuilderContext } from "../Context";
import styled from "styled-components";
import Main from "../Elements/Theme";
import { BuilderController } from "../../utils/constants/methods";
import { Props } from "../../utils/types";

const App: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <BuilderProvider>{children}</BuilderProvider>
    </Layout>
  );
};

const BuilderProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState({ error: "", open: false });

  const [loading, setLoading] = useState(false);

  const [activeConnection, setActiveConnection] = useState([]);

  useEffect(() => {
    if (navState == "MAPPING") {
      setLoading(true);

      call(
        setError,
        BuilderController.getConnectionFieldMapping,
        [activeConnection.Id, activeConnection.forms__Salesforce_Object__c],
        (result, e) =>
          mappingResultHandler(
            result,
            e,
            setActiveFieldMapping,
            setActiveFieldPrefills,
            setActiveFields,
            setLoading
          )
      );
    }
  }, [activeConnection]);

  const [activeFieldMapping, setActiveFieldMapping] = useState([]);

  const [activeFieldPrefills, setActiveFieldPrefills] = useState([]);

  const [activeFields, setActiveFields] = useState([]);

  const [connections, setConnections] = useState([]);

  const [form, setForm] = useState({
    Id: null,
    Name: "",
    forms__Connected_Object__c: "",
    forms__Status__c: "",
    forms__Multi_Page__c: "",
    forms__Multi_Page_Info__c: "",
  });

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    const recordId = url.get("recordId");

    call(setError, "BuilderController.getForm", [recordId], (result, e) =>
      createHandler(result, e, setForm)
    );
  }, []);

  const [navState, setNavState] = useState("QUESTIONS");

  useEffect(() => {
    if (navState == "CONNECT") {
      setLoading(true);

      call(
        setError,
        "BuilderController.getConnections",
        [form.Id],
        (result, e) =>
          connectionsResultHandler(result, e, setConnections, setLoading)
      );
    }
  }, [navState]);

  const [sObjects, setSObjects] = useState([]);

  useEffect(() => {
    call(setError, "BuilderController.getSObjectsAvailable", [], (result, e) =>
      getSObjectsHandler(result, e, setSObjects)
    );
  }, []);

  return (
    <BuilderContext.Provider
      value={{
        error,
        setError,
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
        sObjects,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

const createHandler = (result, e, setForm) => {
  setForm((form) => {
    return {
      ...form,
      Id: result.Id,
      Name: result.Name,
      forms__Connected_Object__c: result.forms__Connected_Object__c,
      forms__Status__c: result.forms__Status__c,
      forms__Multi_Page__c: result.forms__Multi_Page__c,
      forms__Thank_You_Redirect__c: result.forms__Thank_You_Redirect__c,
      forms__Has_Thank_You__c: result.forms__Has_Thank_You__c,
      forms__Multi_Page_Info__c:
        result.forms__Multi_Page_Info__c != null
          ? JSON.parse(result.forms__Multi_Page_Info__c)
          : [],
    };
  });
};

const getSObjectsHandler = (result, e, setSObjects) => {
  setSObjects(result.sort());
};

const connectionsResultHandler = (result, e, setConnections, setLoading) => {
  setConnections(result);
  setLoading(false);
};

const mappingResultHandler = (
  result,
  e,
  setActiveFieldMapping,
  setActiveFieldPrefills,
  setActiveFields,
  setLoading
) => {
  setActiveFieldMapping(result.Mapping);
  setActiveFieldPrefills(result.Prefills);
  setActiveFields(result.Fields);
  setLoading(false);
};

const Layout = styled.div`
  background: ${Main.color.white};
  margin: 0em;
  border-radius: 2px;
`;

export default App;
