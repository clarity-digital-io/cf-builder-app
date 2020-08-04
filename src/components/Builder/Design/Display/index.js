import React, { useContext } from 'react';
import styled from 'styled-components';
import { BuilderContext } from '../../../Context';
import { Single } from './single';
import { Multi } from './multi';

export const Display = () => {

    const { form, previewMode } = useContext(BuilderContext);

		const background = {
			backgroundImage: previewMode.active ? 
				'rgb(22, 50, 92)' : 
				'linearGradient(to right, grey 1px, transparent 1px), linearGradient(to bottom, grey 1px, transparent 1px);'
		};

    return (
			previewMode.active ? 
        <PreviewFormDesign style={background} key={'Display'}>

					{
						form.forms__Multi_Page__c ? 
						<Multi form={form} /> :
						<Single form={form} />
					}

				</PreviewFormDesign> :
				<FormDesign key={'Display'}>

					{
						form.forms__Multi_Page__c ? 
						<Multi form={form} /> :
						<Single form={form} />
					}

				</FormDesign> 
		);

}

const PreviewFormDesign = styled.div`
    height: 92.5vh;
		overflow-y: auto;
		background: rgb(22, 50, 92)
`;

const FormDesign = styled.div`
    height: 92.5vh;
		overflow-y: auto;
    background: #b0c4df;
`;