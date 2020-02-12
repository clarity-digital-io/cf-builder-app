import React, { useContext } from 'react';
import { Radio } from 'antd';
import { DesignContext } from '../../Context';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export const PictureChoice = ({ question, disabled }) => {
	
	const { questionOptions } = useContext(DesignContext); 

	return (
			<RadioGroup>
					{
							questionOptions.get(question.Id) != null ? 
								questionOptions.get(question.Id).map((option) => {
										return (
														<RadioButton
																name={option.Id}
																id={option.Id}
																value={option.Id}
																checked={false}
														>
															<img width="100" src="https://images.unsplash.com/photo-1581278999530-0dc41ad1997d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
														</RadioButton>
												)
								}) :
								null
					}
			</RadioGroup>
	)

}