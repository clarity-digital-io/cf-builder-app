import { Button } from "@salesforce/design-system-react";
import React from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { Question_Option__c } from "../../../../../utils/types/sObjects";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { MAX_PICTURE_CHOICE } from "../../../../../utils/constants/app";
import { OptionItem, OptionsEditPopover } from ".";
import styled from "styled-components";

// create one for PictureOptionsDroppable
export const PictureOptionsDroppable = ({ id, options }: { id: string, options: Question_Option__c[] }) => {

  const { pictureOptions, handleUpdatePictureOption } = useBuilderContext();
  const { setNodeRef } = useDroppable({ id, data: { type: 'options' } });
  // const [images, setImages] = useState([]);
  // maintain state of images on reducer of options - picture
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit

    // setImages(imageList as never[]);
    handleUpdatePictureOption(imageList)

  };

  return <SortableContext id={id} items={options.map(({ id }) => id)} strategy={rectSortingStrategy}>
    <div ref={setNodeRef} >
      <ul>
        <ImageUploading
          multiple={false}
          value={pictureOptions}
          onChange={onChange}
          maxNumber={MAX_PICTURE_CHOICE}
          dataURLKey="data_url"
          acceptType={["jpg"]}
        >
          {(uploadFunctions) => {
            return options.map((option, index) => {
              return <SortablePictureOptionItem id={option.id} option={option} key={index} index={index} uploadFunctions={uploadFunctions} />
            })
          }}
        </ImageUploading>
      </ul>
    </div>
  </SortableContext>

}

const SortablePictureOptionItem = ({ id, option, index, uploadFunctions }: { id: string, option: Question_Option__c, index: number, uploadFunctions: any }) => {

  const {
    imageList,
    onImageUpload,
    onImageUpdate,
    onImageRemove,
  } = uploadFunctions;

  const { options, handleRemoveOptions } = useBuilderContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({
    id
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemove = () => {
    if (!options) return;
    onImageRemove(index);
    handleRemoveOptions(index, true)
  }

  return <li style={style}
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    key={index}
    className="slds-m-top_xx-small"
  >
    <div className="slds-grid">
      <div className="slds-col">
        <OptionsEditPopover option={option}>
          <OptionItem option={option} dragOverlay={false} handleRemove={handleRemove} />
        </OptionsEditPopover>
      </div>

      <div className="slds-col_bump-lef">
        {
          imageList[index].data_url ?
            <img
              onClick={() => {
                onImageUpdate(index);
              }}
              src={imageList[index].data_url}
              width='100px'
            /> :
            <Button
              assistiveText={{ icon: 'Icon Container Small' }}
              onClick={() => {
                onImageUpdate(index);
              }}
              iconCategory="utility"
              iconName="add"
              iconSize="small"
              iconVariant="border-filled"
              variant="icon"
            />
        }

      </div>
    </div>
  </li>
}