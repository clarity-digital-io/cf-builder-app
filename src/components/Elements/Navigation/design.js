import React, { useState, useContext } from 'react';
import LCC from 'lightning-container';

import { BuilderContext, DesignContext } from '../../Context';

import {ToastContainer, Toast, Modal, Icon as SalesforceIcon, BuilderHeader, BuilderHeaderNav, BuilderHeaderNavDropdown, BuilderHeaderNavLink, BuilderHeaderToolbar, ButtonGroup, Button } from '@salesforce/design-system-react'; 
import { useDrag } from '../../Builder/Design/Display/useDrag';
import { call } from '../../RemoteActions';

const Icon = ({ type, label, background }) => (
	<SalesforceIcon
		assistiveText={{ label: label }}
		category="standard"
		name={type}
		size="medium"
	/>
)

const DesignNavigation = () => {

	const { navState, setNavState, form, setForm, setLoading, setError, previewMode, setPreviewMode, error } = useContext(BuilderContext);

	const { update, questions } = useContext(DesignContext); 

	const [type, setType] = useState(null);

	const { update : dragUpdate } = useDrag();

	const [publishCheck, setPublishCheck] = useState(false);

	const preview = () => {
			setPreviewMode({ active: true, desktop: true }); 
	}

	const editMode = () => {
		setPreviewMode({ active: false, desktop: true }); 
	}

	//Publish and Draft Handling
	const publish = () => {
			if(questions.length > 0) {

					setType('Publish');

					setPublishCheck(true);

			} else {

					setType('Publish Error');   
					
					setPublishCheck(true); 

			}
	}

	const handleCancel = () => {
			
			setPublishCheck(false); 

	}

	const handlePublish = () => {

			setLoading(true); 

			call(
					setError,
					"FormBuilder.updateStatus", 
					[form.Id, 'Published'], 
					(result, e) => publishHandler(result, e, setLoading, setPublishCheck, setForm)
			);

	}

	const handleDraft = () => {
        
		setLoading(true); 

		call(
				setError,
				"FormBuilder.updateStatus", 
				[form.Id, 'Draft'], 
				(result, e) => publishHandler(result, e, setLoading, setPublishCheck, setForm)
		);

}
	//Navigation Handling
	const navigate = (loc) => {

			setNavState(loc);

	}

	const back = () => {
		LCC.sendMessage({name: "Back", value: form.Id });
	}

	const help = () => {
		LCC.sendMessage({name: "Help", value: form.Id });
	}

	return [
		<BuilderHeader
			assistiveText={{
				backIcon: 'Back',
				helpIcon: 'Help',
				icon: 'Builder',
			}}
			labels={{
				back: 'Back',
				help: 'Help',
				pageType: form.Name,
				title: 'Clarity Forms',
			}}
			events={{
				onClickBack: back,
				onClickHelp: help
			}}
			style={{ position: 'relative' }}
		>
			<BuilderHeaderNav>
					<BuilderHeaderNavDropdown
						assistiveText={{ icon: 'Dropdown' }}
						iconCategory="utility"
						iconName="page"
						id="dropdown"
						label="Options"
						onSelect={(e) => navigate(e.value)}
						options={[
							{ label: 'Add Questions', value: 'QUESTIONS' },
							{ label: 'Connections', value: 'CONNECT' },
							{ label: 'Settings', value: 'SETTINGS' },
						]}
					/>
			</BuilderHeaderNav>
			<BuilderHeaderToolbar
				assistiveText={{
					actions: 'Document Actions',
				}}
				onRenderActions={() => (
					<div>
						<Icon
							category="utility"
							className="slds-m-right_x-small"
							name="check"
							size="x-small"
							style={{ fill: '#4BCA81' }}
						/>
						<span className="slds-color__text_gray-10 slds-align-middle slds-m-right_small">
							{ update || dragUpdate ? 'Saving...' : 'Saved' }
						</span>
						<Button
							iconCategory="utility"
							iconName="right"
							iconPosition="left"
							label={ previewMode.active ? "Edit Mode" : "Preview" }
							onClick={() => {
								previewMode.active ? 
								editMode() : 
								preview()
							}}
						/>
						{
							form.forms__Status__c == 'Published' ?
							<Button label="Set to Draft" onClick={() => handleDraft()} /> :
							<Button label="Publish" variant="brand" onClick={() => publish()} />
						}
					</div>
				)}
			>
			</BuilderHeaderToolbar>
		</BuilderHeader>,
		<Modal
			onRequestClose={() => handleCancel()}
			isOpen={publishCheck}
			footer={<BuildFooter handleCancel={handleCancel} handlePublish={handlePublish} type={type} />}
		>	
			<section className="slds-p-around_large">
				<BuildMessage type={type} />
			</section>
		</Modal>,

		error.open ?
		<ToastContainer>
			<Toast
				labels={{
					heading: error.message
				}}
				duration="10000"
				variant="error"
				onRequestClose={() => setError({ message: '', open: false})}
			/> 
		</ToastContainer> :
		null
	]
}

const BuildFooter = ({ type, handleCancel, handlePublish }) => {

	const getFooter = (type) => {

			switch (type) {
					case 'Publish':
							return ([<Button key="back" onClick={() => handleCancel()}>
													Cancel
											</Button>,
											<Button key="submit" variant="brand" onClick={() => handlePublish()}>
													Publish
											</Button>])
							break;
					default:
							return (<Button key="back" onClick={() => handleCancel()}>
													Cancel
											</Button>)
							break;
			}

	}

	return getFooter(type);

}

const BuildMessage = ({ type }) => {

	const getMessage = (type) => {

			switch (type) {
					case 'Publish':
							return (<div>
													<h1>
															Are you sure you want to publish this form?
													</h1>
													<p>
															Updates to the form are only possible in Draft mode.
													</p>
											</div>)
							break;
					default:
							return (<div>
													<h1>
															Unable to publish form without questions.
													</h1>
													<p>
															Please add a question before publishing this form.
													</p>
											</div>)
							break;
			}
			
	}

	return getMessage(type);

}

const publishHandler = (result, e, setLoading, setPublishCheck, setForm) => {

	setLoading(false); 

	setPublishCheck(false); 

	if(result.Status == 'Success') {

			setForm(form => {
					return { ...form, forms__Status__c: result.Form.forms__Status__c }
			});

	}
}

export default DesignNavigation;