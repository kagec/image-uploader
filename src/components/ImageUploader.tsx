import type { VFC } from "react";

const ImageUploader: VFC = () => {
  return (
    <div>
      <header>Upload your image</header>
      <div>FIle should be Jpeg Png...</div>
      <div>
        <div>Drag & Drop your image here</div>
      </div>
      <div>Or</div>
    </div>
  );
};

export default ImageUploader;
