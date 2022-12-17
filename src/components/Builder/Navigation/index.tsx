import React, { useState } from "react";
import LCC from "lightning-container";
import {
  ToastContainer,
  Toast,
  Modal,
  Icon,
  BuilderHeader,
  BuilderHeaderNav,
  BuilderHeaderNavDropdown,
  BuilderHeaderToolbar,
  Button,
} from "@salesforce/design-system-react";
import { useBuilderContext } from "../../../context/BuilderContext";
import { FORMSTATUS } from "../../../hooks/Builder";
import { useDesignContext } from "../../../context/DesignContext";
import { NavStates } from "../../../reducers/BuilderProvider";

enum PUBLISHMODAL {
  VALID,
  ERROR
}

const Navigation = () => {

  const [type, setType] = useState<PUBLISHMODAL>(PUBLISHMODAL.VALID);

  const [isPublishModalOpen, setPublishModalOpen] = useState(false);

  const { form, error, handleError, handleNavigate, handleFormStatusUpdate } = useBuilderContext();

  const { questions } = useBuilderContext();

  const publish = () => {
    if (Object.keys(questions).length > 0) {
      setType(PUBLISHMODAL.VALID);
      setPublishModalOpen(true);
    } else {
      setType(PUBLISHMODAL.ERROR);
      setPublishModalOpen(true);
    }
  };

  const back = () => {
    LCC.sendMessage({ name: "Back", value: form.Id });
  };

  const help = () => {
    LCC.sendMessage({ name: "Help", value: form.Id });
  };

  return <>
    <BuilderHeader
      key={'BuilderHeader'}
      assistiveText={{
        backIcon: "Back",
        helpIcon: "Help",
        icon: "Builder",
      }}
      labels={{
        back: "Back",
        help: "Help",
        pageType: form.Name,
        title: "Clarity Forms",
      }}
      events={{
        onClickBack: back,
        onClickHelp: help,
      }}
    >
      <BuilderHeaderNav>
        <BuilderHeaderNavDropdown
          assistiveText={{ icon: "Dropdown" }}
          iconCategory="utility"
          iconName="page"
          id="dropdown"
          label="Options"
          onSelect={(e: any) => handleNavigate(e.value)}
          options={[
            { label: "Add Questions", value: NavStates.QUESTIONS, key: 0 },
            { label: "Connections", value: "CONNECT", key: 1 },
            { label: "Settings", value: "SETTINGS", key: 2 },
          ]}
        />
      </BuilderHeaderNav>
      <BuilderHeaderToolbar
        key={'2'}
        assistiveText={{
          actions: "Document Actions",
        }}
        onRenderActions={() => (
          <div>
            <Icon
              className={'slds-m-right_x-small'}
              assistiveText={{ label: 'Action' }}
              category={'utility'}
              name={'check'}
              size={'xx-small'}
              style={{ fill: "#4BCA81" }}
            />
            {/* <span className="slds-color__text_gray-10 slds-align-middle slds-m-right_small">
              {update ? "Saving..." : "Saved"}
            </span> */}
            {
              form.forms__Status__c == "Published" ? (
                <Button
                  label="Set to Draft"
                  onClick={() => () => handleFormStatusUpdate(FORMSTATUS.DRAFT)}
                />
              ) : (
                <Button
                  label="Publish"
                  variant="brand"
                  onClick={publish}
                />
              )}
          </div>
        )}
      ></BuilderHeaderToolbar>
    </BuilderHeader>
    <Modal
      key={'Modal'}
      onRequestClose={() => setPublishModalOpen(false)}
      isOpen={isPublishModalOpen}
      footer={
        <ModalFooter
          handleCancel={() => setPublishModalOpen(true)}
          handlePublish={() => handleFormStatusUpdate(FORMSTATUS.PUBLISH)}
          type={type}
        />
      }
    >
      <section className="slds-p-around_large">
        <ModalMessage type={type} />
      </section>
    </Modal>

    {
      error.display ? (
        <ToastContainer>
          <Toast
            labels={{
              heading: error.message,
            }}
            duration="10000"
            variant="error"
            onRequestClose={() => handleError({ message: "", display: false })}
          />
        </ToastContainer>
      ) : null
    }
  </>
};

const ModalFooter = ({ type, handleCancel, handlePublish }: { type: PUBLISHMODAL, handleCancel: any, handlePublish: any }) => {
  switch (type) {
    case PUBLISHMODAL.VALID:
      return <>
        <Button key="back" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button key="submit" variant="brand" onClick={() => handlePublish()}>
          Publish
        </Button>
      </>;
    default:
      return (
        <Button key="back" onClick={() => handleCancel()}>
          Cancel
        </Button>
      );
  }
};

const ModalMessage = ({ type }: { type: PUBLISHMODAL }) => {
  switch (type) {
    case PUBLISHMODAL.VALID:
      return (
        <div>
          <h1>Are you sure you want to publish this form?</h1>
          <p>Updates to the form are only possible in Draft mode.</p>
        </div>
      );
    default:
      return (
        <div>
          <h1>Unable to publish form without questions.</h1>
          <p>Please add a question before publishing this form.</p>
        </div>
      );
  }
};

export default Navigation;
