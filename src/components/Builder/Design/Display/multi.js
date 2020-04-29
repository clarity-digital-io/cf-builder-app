import React, { useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import { GenerateQuestion, DropView } from './elements';

import { useMultiDrag } from './useMultiDrag';
import { Dropdown, Icon, Input } from '@salesforce/design-system-react'; 
import { BuilderContext } from '../../../Context';
import { QuestionPreview } from './questionPreview';

import styled from 'styled-components';

const PageTabItems = styled.ul`
	display: flex;
	justify-content: space-around;
	position: relative; 

	li {
		cursor:pointer;
		float: left;
		padding: 1em;
		border-radius: 50%; 
		border: 1px solid #f5f5f5;
		z-index: 999; 
		height: 80px; 
		width: 80px; 
		background: #fff; 
		img {
			display: block;
		}
		span {
			display: block;
			text-transform: uppercase;
			text-align:center; 
			margin-top: 4px; 
			font-size: .75em;
			color:rgb(22, 50, 92);
		}
	}

	li.active {
		font-weight: 900; 
		border-radius: 50%; 
		background: rgb(22, 50, 92);
		span {
			color: #fff;
		}
	}

`;

const Linear = styled.div`
	height: 3px;
	background: #f5f5f5;
	position: absolute;
	width: 90%;
	margin: 0 auto;
	left: 0;
	right: 0;
	top: 50%;
	z-index: 1;

`;

export const Multi = ({ form }) => {

		const background = {
			background: '#fff'
		};

		const { previewMode, setNavState } = useContext(BuilderContext);

		const { pages, activePage, setActivePage, activePageQuestions, setDeletePage, setAddPageUpdate } = useMultiDrag(); 

		const designPages = form.forms__Multi_Page_Info__c != null ? form.forms__Multi_Page_Info__c : pages; 

		const selectPageOption = (e, { option }) => {
		 	if(option.value != activePage) {
				setActivePage(option.value)
			}
		}

		const selectPageAction = (e, { option }) => {
			if(option.value == "NEW_PAGE") {
				setAddPageUpdate(true)
			} else if(option.action == 'EDIT_PAGE') {
				setNavState('EDIT_PAGE')
			} else if(option.action == 'DELETE') {
				setDeletePage(activePage)
			}
		}

		return (
			previewMode.active ? 
			<div className="slds-m-around_x-large">
				  <div style={background}>

							<View border bigspace>
								<PageTabItems>
								<Linear></Linear>
									{
										designPages.map((page) => {
											let iconData = page.icon != '' ? page.icon.split(':') : ['standard', 'announcement'];
											let category = iconData[0];
											let name = iconData[1];
											return <li className={ page.page == activePage ? 'active' : '' } onClick={ () => setActivePage(page.page) }>
												
												<Icon
													assistiveText={{ label: page.title }}
													category={category}
													name={name}
													size="small"
												/>

												<span>
													{ page.title }
												</span>
											</li>
										})
									}
								</PageTabItems>
							</View>
							<View bigspace>
							{
									activePageQuestions.map((item, index) => (

										<QuestionPreview question={item} />

									))
							}
							</View>

					</div>
			</div>
			:
			<div key={activePage}>
                           
				<View borderLeft whiteBG className="row middle-xs end-xs" key={'Header'}>
						<View className="col-xs-12">
								<ViewStyle border>

									<Dropdown
											align="right"
											iconCategory="utility"
											iconName="down"
											iconPosition="right"
											label={ `Page ${activePage + 1}` }
											options={pages}
											onSelect={(e, data) => selectPageOption(e, data)}
										/>

										<Dropdown
											assistiveText={{ icon: 'More Options' }}
											iconCategory="utility"
											iconName="down"
											iconVariant="border-filled"
											onSelect={(e, data) => selectPageAction(e, data)}
											options={[
												{ label: 'New Page', value: 'NEW_PAGE'},
												{ label: 'Edit', value: activePage, action: 'EDIT_PAGE' },
												{ label: 'Delete', value: activePage, action: 'DELETE' }
											]}
										/>

								</ViewStyle>
						</View>
				</View>

				<Droppable droppableId={'multi_' + activePage}>
						{(provided, snapshot) => (
								<DropView 
										isDraggingOver={snapshot.isDraggingOver}
										ref={provided.innerRef}>

										{
												activePageQuestions.map((item, index) => (
														<Draggable
																key={`question${item.Id}${index}`}
																draggableId={`question${item.Id}${index}`}
																index={index}>
																{(provided, snapshot) => <GenerateQuestion key={item.Id} item={item} provided={provided} snapshot={snapshot} />}
														</Draggable>
												)
										)}

										{provided.placeholder}

								</DropView>
						)}
				</Droppable>
			</div>
		)

}