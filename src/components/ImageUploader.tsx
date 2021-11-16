import axios from "axios";
import { useState } from "react";
import type { VFC, ChangeEvent, DragEvent, MouseEvent } from "react";
import styled from "styled-components";
import Image from "../image/image.svg";

type OnChangeInput = (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
type PostImageData = (files: FileList | null) => Promise<void>;
type OnDrop = (e: DragEvent) => Promise<void>;

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
    throw new Error();
  }
};

const ImageUploader: VFC = () => {
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>();
  const reader = new FileReader();
  reader.onload = (e) => {
    if (!e.target) {
      return;
    }
    setImageData(e.target.result);
  };

  const onChangeInput: OnChangeInput = async (e) => {
    const { files } = e.target;

    if (!files) {
      alert("Please select your image");
      return;
    }

    try {
      await postImageData(files);
      reader.readAsDataURL(files[0]);
    } catch (e) {
      alert("Upload failed");
    }

    e.target.value = "";
  };

  const onDrop: OnDrop = async (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (files.length > 1) {
      alert("Please select only one image");
      return;
    } else if (!files[0].type.includes("image/")) {
      alert("Please select a image file (jpeg, png...)");
      return;
    }

    try {
      await postImageData(e.dataTransfer.files);
      reader.readAsDataURL(files[0]);
    } catch (e) {
      alert("Upload failed");
    }
  };

  const onDragOver = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <ImageUploaderConteiner>
      {imageData ? (
        <MaterialIcon className="material-icons">check_circle</MaterialIcon>
      ) : null}
      <Header>
        {imageData ? "Uploaded Successfully!" : "Upload your image"}
      </Header>
      {imageData ? null : <Hint>FIle should be Jpeg Png...</Hint>}
      <DragAndDropWrapper>
        {imageData ? (
          <img src={imageData as string} alt="here" />
        ) : (
          <DragAndDrop onDrop={onDrop} onDragOver={onDragOver}>
            <div>Drag & Drop your image here</div>
          </DragAndDrop>
        )}
      </DragAndDropWrapper>
      {imageData ? null : <Or>Or</Or>}
      {imageData ? (
        <CopyLink>
          <span></span>
          <button>Copy Link</button>
        </CopyLink>
      ) : (
        <InputLabel>
          choose a file
          <input
            name="image"
            accept="image/*"
            type="file"
            onChange={onChangeInput}
          />
        </InputLabel>
      )}
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

const DragAndDropWrapper = styled.div`
  margin-top: 25px;
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

const MaterialIcon = styled.span`
  font-size: 40px;
  color: #219653;
`;

const CopyLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 338px;
  height: 34px;
  margin-top: 25px;
  background-color: #f6f8fb;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  > span {
    color: #4f4f4f;
    font-size: 8px;
    width: 240px;
    height: 12px;
    margin-left: 7px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > button {
    color: #fff;
    font-size: 8px;
    width: 74px;
    height: 30px;
    background-color: #2f80ed;
    border-color: transparent;
    border-radius: 8px;
  }
`;

export default ImageUploader;
