import axios from "axios";
import type { VFC, ChangeEvent } from "react";
import styled from "styled-components";
import Image from "../image/image.svg";

type UploadFile = (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
type PostImageData = (files: FileList | null) => Promise<void>;

const URL = "http://localhost:4000/public/image";

const postImageData: PostImageData = async (files) => {
  const postImage = new FormData();

  if (!files) {
    return;
  }

  postImage.append("image", files[0]);

  try {
    await axios.post(URL, postImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const ImageUploader: VFC = () => {
  const uploadFile: UploadFile = async (e) => {
    const { files } = e.target;

    if (!files) {
      alert("Please select your image");
      return;
    }

    await postImageData(files);

    e.target.value = "";
  };

  return (
    <ImageUploaderConteiner>
      <Header>Upload your image</Header>
      <Hint>FIle should be Jpeg Png...</Hint>
      <DragAndDrop>
        <div>Drag & Drop your image here</div>
      </DragAndDrop>
      <Or>Or</Or>
      <InputLabel>
        choose a file
        <input
          name="image"
          accept="image/*"
          type="file"
          onChange={uploadFile}
        />
      </InputLabel>
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
  min-width: 338px;
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

const InputLabel = styled.label`
  display: inline-block;
  color: #fff;
  font-size: 12px;
  padding-top: 8px;
  width: 101px;
  height: 32px;
  background: #2f80ed;
  border-radius: 8px;
  margin-top: 22px;

  input {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default ImageUploader;
