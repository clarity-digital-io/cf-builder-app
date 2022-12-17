import React, { useContext, useEffect, useState } from "react";

import { call } from "../../../../../query";
import View from "../../../../Elements/View";
import ViewStyle from "../../../../Elements/View/style";
import Box from "../../../../Elements/Box";
import { Button } from "../../../../Elements/Button";

import { BuilderContext, DesignContext } from "../../../../../context";
import { StatusHandler } from "../../../../Elements/Notification";

import {
  Input as SalesforceInput,
  Dropdown,
  Checkbox,
} from "@salesforce/design-system-react";

const getCorrectPage = (info, activePage) => {
  if (info == null) {
    return { page: "", title: "", icon: "" };
  }

  if (typeof info === "string") {
    info = JSON.parse(info);
  }

  const correctPage = info.filter((i) => {
    return i.page == activePage;
  });

  if (correctPage.length == 0) {
    return { page: "", title: "", icon: "" };
  }

  return correctPage[0];
};

export const EditPageState = () => {
  const { form, setForm, setError } = useContext(BuilderContext);

  const { activePage } = useContext(DesignContext);

  const [update, setUpdate] = useState(false);

  const [activePageInfo, setActivePageInfo] = useState(
    getCorrectPage(form.forms__Multi_Page_Info__c, activePage)
  );

  useEffect(() => {
    if (update) {
      form.forms__Multi_Page_Info__c =
        form.forms__Multi_Page_Info__c != null
          ? JSON.stringify(form.forms__Multi_Page_Info__c)
          : "";

      StatusHandler(
        form.forms__Status__c,
        () => setUpdate(false),
        () =>
          call(
            setError,
            "BuilderController.updateForm",
            [JSON.stringify(form)],
            (result, e) => resultHandler(result, e, setForm, setUpdate)
          ),
        null,
        setError
      );
    }
  }, [update]);

  const selectPageProperty = (e, property) => {
    const value = e.target.value;

    setForm((form) => {
      const multiPageInfo = form.forms__Multi_Page_Info__c;

      const preppedMultiPageInfo = multiPageInfo.map((page) => {
        if (page.page == activePage) {
          page[property] = value;
        }
        return page;
      });

      return { ...form, forms__Multi_Page_Info__c: preppedMultiPageInfo };
    });
  };

  const updateValidatePage = (e) => {
    const checked = e.target.checked;

    setForm((form) => {
      return { ...form, forms__Multi_Page_Val__c: checked };
    });
  };

  return [
    <View borderRight className="row middle-xs end-xs" key={"Header"}>
      <View className="col-xs-12">
        <ViewStyle border>
          <Button onClick={() => setUpdate(true)}>
            {update ? "Saving..." : "Save Changes"}
          </Button>
        </ViewStyle>
      </View>
    </View>,
    <View borderRight body className="row" key={"Body"}>
      <View className="col-xs-12">
        <Box padding="0">
          <ViewStyle space border>
            <h1>Page {activePage + 1} Settings</h1>

            <p>Update Page Information.</p>
          </ViewStyle>

          <ViewStyle space border>
            <h1>Page Icon</h1>

            <p>This is a Salesforce Icon used as the tab navigation icon.</p>

            <ViewStyle>
              <SalesforceInput
                aria-describedby={activePageInfo.page + "title"}
                defaultValue={activePageInfo.title}
                id={activePageInfo.page + "title"}
                onChange={(e) => selectPageProperty(e, "title")}
              />
            </ViewStyle>
          </ViewStyle>

          <ViewStyle space border>
            <h1>Page Title</h1>

            <p>This is displayed under the tab icon.</p>

            <ViewStyle>
              <SalesforceInput
                aria-describedby={activePageInfo.page + "title"}
                defaultValue={activePageInfo.icon}
                id={activePageInfo.page + "title"}
                onChange={(e) => selectPageProperty(e, "icon")}
              />
            </ViewStyle>
          </ViewStyle>

          <ViewStyle space border>
            <h1>Validate By Page</h1>
            <p>
              Continue button is disabled until all fields meet validation
              requirements.
            </p>

            <View className="row">
              <View className="col-xs-12">
                <Box padding="1em 0 0 0">
                  <Checkbox
                    id={form.Name + "Flow"}
                    variant="toggle"
                    defaultChecked={form.forms__Multi_Page_Val__c}
                    onChange={(e, { checked }) => updateValidatePage(e)}
                  />
                </Box>
              </View>
            </View>
          </ViewStyle>
        </Box>
      </View>
    </View>,
  ];
};

const resultHandler = (result, e, setForm, setUpdate) => {
  setUpdate(false);

  setForm((form) => {
    return {
      ...form,
      forms__Multi_Page_Info__c: JSON.parse(result.forms__Multi_Page_Info__c),
    };
  });
};
