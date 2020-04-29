import React, { useState, useContext } from 'react';
import ViewStyle from '../../../../Elements/View/style';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import CloseIcon from '../../../../Elements/Icons/close';

import { Button } from '../../../../Elements/Button';
import { EditContext, DesignContext } from '../../../../Context';

import { Input as SalesforceInput, Modal as SalesforceModal, Avatar } from '@salesforce/design-system-react';

const getIconPath = () => {
	return process.env.NODE_ENV == 'development' ? "/assets/" : "/_slds/"
}

export const PictureChoices = ({ question }) => {

    const [preview, setPreview] = useState({ image: null, visible: false });

    const { activeQuestionOptions, setActiveQuestionOptions } = useContext(EditContext);

		const { activeQuestion } = useContext(DesignContext);

    const handlePreview = (file) => {
        setPreview({ image: file.thumbUrl, visible: true })
    }

    const handleCancel = (file) => {
        setPreview(preview => {
            return { ...preview, visible: false }
        })
    }

    const updateImage = (order, file) => {

        setActiveQuestionOptions((options) => {
            return options.map((option, index) => {

                if(order == index) {
                    return { ...option, forms__Choice_Image__c: file }
                }
                return option; 
            })

        })

    }

    const updateOption = (e, order, file) => {

        if(e.key != 'Enter') {
            let value = e.target.value;
            setActiveQuestionOptions((options) => {
                return options.map((option, index) => {

                    if(order == index) {
                        return { ...option, forms__Label__c: value, forms__Choice_Image__c: file, forms__Order__c: index }
                    }
                    return option; 
                })

            })

        }
    }

    const removeRow = (order) => {

				setActiveQuestionOptions(rows => {
						let updated = rows.slice();
						updated.splice(order, 1);
            return updated;
        })

    }

    const add = (value, activeQuestionId, file) => {
        setActiveQuestionOptions(options => {
            return options.concat([
							{ 
								forms__Order__c: options.length, 
								forms__Label__c: value, 
								forms__Clarity_Form_Question__c: activeQuestionId, 
								forms__Choice_Image__c: file
							}
						]);
				})
				
    }

		return (
        <ViewStyle>

            <h1>Picture Choice Options</h1>

            <ViewStyle>

                <PictureChoice 
                    isNew={true} 
                    activeQuestionId={activeQuestion.Id} 
										add={add}
                />

								<SalesforceModal
									isOpen={preview.visible}
									footer={null}
									onRequestClose={() => handleCancel()}
								>
									<section className="slds-p-around_large">
										<div className="slds-form-element slds-m-bottom_large">
											<img alt="example" style={{ width: '100%' }} src={preview.image} />
										</div>
									</section>
								</SalesforceModal>


            </ViewStyle>

            {
								activeQuestionOptions.map((option, order) => {
										return (
												<PictureChoice
														isNew={false} 
														updateOption={updateOption}
														activeQuestionId={activeQuestion.Id} 
														option={option} 
														order={order} 
														removeRow={removeRow}
												/>
										)
								})
            }

        </ViewStyle>
    )

}

const buildFiles = (option, newImage) => {

	let url = '';

	if(option != null && option.forms__Choice_Image__c.length == 18) {
		url = `/sfc/servlet.shepherd/version/download/${option.forms__Choice_Image__c}`;
	} else {
		url = option ? option.forms__Choice_Image__c : newImage;
	}

	return url;
}

const PictureChoice = ({ isNew, activeQuestionId, option, order, updateOption, add, newImage, removeRow }) => {

		const [newValue, setNewValue] = useState('');

		const [file, setFile] = useState(buildFiles(option, newImage));

		const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            let value = e.target.value;

						add(value, activeQuestionId, file);

						setNewValue('');
						setFile([])

        }

    }

    const handleAdd = (e) => {
        add(newValue, activeQuestionId, file);

        setNewValue('');
				setFile([])
    }

    const uploadChange = (e) => {

			let fileList = e.target.files;
			
			let file = fileList[0];

			let reader = new window.FileReader();

			reader.readAsDataURL(file);

			reader.onload = (...args) => {
	
					let fileContents = reader.result;

					setFile(buildFiles(option, fileContents));

			};
		}

		const closeStyle = {
			height: '20%',
			width: '20%',
		};

    return (
        <View className="row">
            <View className="col-xs-3 center-xs">
                <Box padding={'.5em'}>

											{
												file != null && file.length ?
												<img src={ file } imgAlt={ option != null ? option.forms__Label__c : '' } style={{ width: '60px' }} />
												: 
												[
												<input onChange={(e) => uploadChange(e)} type="file" className="slds-file-selector__input slds-assistive-text" accept="image/png" id="file-upload-input-01" aria-labelledby="file-selector-primary-label file-selector-secondary-label" />,
												<label className="slds-file-selector__body" htmlFor="file-upload-input-01" id="file-selector-secondary-label">
	
													<span className="slds-file-selector__button slds-button slds-button_neutral">
														<svg className="slds-button__icon slds-button__icon_left" aria-hidden="true">
															<use xlinkHref={ `${getIconPath()}icons/utility-sprite/svg/symbols.svg#upload` }></use>
														</svg>
														Upload File
													</span>
												</label>
												]
											}

                </Box>
            </View>

            {
                isNew ? 
                [
                    <View className="col-xs-7">
                        <Box padding={'.5em'}>
                            
														<SalesforceInput
															onKeyPress={(e) => handleKeyDown(e)} 
															value={newValue} 
															id="New" 
															onChange={(e) => setNewValue(e.target.value)} 
														/>

                        </Box>
                    </View>,
                    <View className="col-xs-2">
                        <Box padding={'.5em'}>
            
                            <Button add onClick={() => handleAdd()}>&#43;</Button>
            
                        </Box>
                    </View>
                ] : 
                [
                    <View className="col-xs-7">
                    <Box padding={'.5em'}>

												<SalesforceInput
													value={option.forms__Label__c} 
													id={option.Id} 
													placeholder="Option" 
													onChange={(e) => updateOption(e, order)} 
												/>
                        
                    </Box>
                    </View>,
                    <View className="col-xs-2">
                        <Box padding={'.5em'}>
														<div style={closeStyle} onClick={() => removeRow(order)}>

															<CloseIcon />

														</div>       
                        </Box>
                    </View>
                ]
            }

        </View>
    )
}