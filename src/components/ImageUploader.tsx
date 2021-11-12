import type { VFC } from "react";
import styled from "styled-components";
import Image from "../image/image.svg";

const ImageUploader: VFC = () => {
  return (
    <ImageUploaderConteiner>
      <Header>Upload your image</Header>
      <Hint>FIle should be Jpeg Png...</Hint>
      <DragAndDrop>
        <div>Drag & Drop your image here</div>
      </DragAndDrop>
      <Or>Or</Or>
      <label>
        choose a file
        <input name="image" accept="image/*" type="file" />
      </label>
    </ImageUploaderConteiner>
  );
};

const ImageUploaderConteiner = styled.div`
  padding: 36px 32px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
`;

const Header = styled.header`
  color: #4f4f4f;
  font-size: 18px;
  font-weight: 500;
`;

const Hint = styled.div`
  color: #828282;
  font-size: 10px;
  margin-top: 16px;
`;

const DragAndDrop = styled.div`
  min-height: 219px;
  background: #f6f8fb;
  border: 1px dashed #97bef4;
  border-radius: 12px;
  margin-top: 30px;
  background-image: url(${Image});
  background-repeat: no-repeat;
  background-position: 50% 25%;

  > div {
    color: #bdbdbd;
    font-size: 12px;
    margin-top: 161px;
  }
`;

const Or = styled.div`
  color: #bdbdbd;
  font-size: 12px;
  margin-top: 18px;
`;

export default ImageUploader;
