import { useState } from "react";
import type { VFC, ChangeEvent, DragEvent, MouseEvent } from "react";
import styled from "styled-components";
import Image from "../image/image.svg";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase/firebaseConfig";

type OnChangeInput = (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
type OnDrop = (e: DragEvent) => Promise<void>;

const ImageUploader: VFC = () => {
  const [imageUrlOnServer, setImageUrlOnServer] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onChangeInput: OnChangeInput = async (e) => {
    const { files } = e.target;

    if (!files) {
      alert("Please select your image");
      return;
    }

    const fileName = files[0].name;
    const imagesRef = ref(storage, `images/${fileName}`);

    try {
      setIsUploading(true);
      await uploadBytes(imagesRef, files[0]);
      const imageDownloadUrl = await getDownloadURL(imagesRef);
      setImageUrlOnServer(imageDownloadUrl);
      setIsUploading(false);
    } catch (e) {
      alert("Upload failed");
      setIsUploading(false);
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

    const fileName = files[0].name;
    const imagesRef = ref(storage, `images/${fileName}`);

    try {
      setIsUploading(true);
      await uploadBytes(imagesRef, files[0]);
      const imageDownloadUrl = await getDownloadURL(imagesRef);
      setImageUrlOnServer(imageDownloadUrl);
      setIsUploading(false);
    } catch (e) {
      alert("Upload failed");
      setIsUploading(false);
    }
  };

  const onDragOver = (e: MouseEvent) => {
    e.preventDefault();
  };

  const copyUrlToClipboard = () => {
    try {
      navigator.clipboard.writeText(imageUrlOnServer);
      alert("Successful copy to clipboard");
    } catch (e) {
      alert("Copy to clipboard failed!");
    }
  };

  return isUploading ? (
    <LoadingContainer>
      Uploading...
      <LoadingAnimation></LoadingAnimation>
    </LoadingContainer>
  ) : (
    <ImageUploaderConteiner>
      {imageUrlOnServer ? (
        <MaterialIcon className="material-icons">check_circle</MaterialIcon>
      ) : null}
      <Header>
        {imageUrlOnServer ? "Uploaded Successfully!" : "Upload your image"}
      </Header>
      {imageUrlOnServer ? null : <Hint>FIle should be Jpeg, Png...</Hint>}
      <DragAndDropWrapper>
        {imageUrlOnServer ? (
          <img src={imageUrlOnServer} alt="here" />
        ) : (
          <DragAndDrop onDrop={onDrop} onDragOver={onDragOver}>
            <div>Drag & Drop your image here</div>
          </DragAndDrop>
        )}
      </DragAndDropWrapper>
      {imageUrlOnServer ? null : <Or>Or</Or>}
      {imageUrlOnServer ? (
        <CopyLink>
          <div>{imageUrlOnServer}</div>
          <button onClick={copyUrlToClipboard}>Copy Link</button>
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
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 338px;
  height: 34px;
  margin-top: 25px;
  background-color: #f6f8fb;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  > div {
    color: #4f4f4f;
    font-size: 8px;
    width: 240px;
    margin-left: 7px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

const LoadingContainer = styled.div`
  color: #4f4f4f;
  font-size: 18px;
  width: 400px;
  height: 144px;
  padding-top: 36px;
  padding-left: 32px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const LoadingAnimation = styled.div`
  position: relative;
  width: 340px;
  height: 6px;
  margin-top: 31px;
  background-color: #f2f2f2;
  border-radius: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    background-color: #2f80ed;
    border-radius: 8px;
    width: 101px;
    height: 6px;
    animation: lineAnime 1.5s linear 0s infinite normal forwards;
  }

  @keyframes lineAnime {
    from {
      transform: translateX(-100px);
    }
    to {
      transform: translateX(340px);
    }
  }
`;

export default ImageUploader;
