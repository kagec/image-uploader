import type { VFC } from "react";
import styled from "styled-components";

const ImageUploader: VFC = () => {
  return (
    <ImageUploaderConteiner>
      <Header>Upload your image</Header>
      <Hint>FIle should be Jpeg Png...</Hint>
      <div>
        <div>Drag & Drop your image here</div>
      </div>
      <div>Or</div>
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

export default ImageUploader;
