import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import View from '../../../Elements/View';
import { Button } from '../../../Elements/Button';
import { GenerateQuestion, DropView } from './elements';

import { useMultiDrag } from './useMultiDrag';
import {Dropdown} from '@salesforce/design-system-react'; 

export const Multi = ({ style }) => {

		const { pages, activePage, setActivePage, activePageQuestions, setDeletePage, setAddPageUpdate } = useMultiDrag(); 

		const selectPageOption = (e, { option }) => {
			if(option.value == "NEW_PAGE") {
				setAddPageUpdate(true)
			} else if(option.value != activePage) {
				setActivePage(option.value)
			}
		}

		return (
			<div key={activePage}>

					<View white space>
						<Dropdown
							align="right"
							iconCategory="utility"
							iconName="down"
							iconPosition="right"
							label={ `Page ${activePage + 1}` }
							options={pages}
							onSelect={(e, data) => selectPageOption(e, data)}
						/>

						<Button variant="destructive" onClick={(e) => setDeletePage(activePage)}>Delete Page { activePage + 1}</Button>

					</View> 

					<Droppable droppableId={'' + activePage}>
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