import { useState } from "react";
import "./styles.css";

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);

    tobase64Handler(files);
  };

  const resetFile = (e) => {
    e.preventDefault();
    console.clear();
    document.getElementById("upload").value = "";
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const tobase64Handler = async (files) => {
    const filePathsPromises = [];

    files.forEach((file) => {
      filePathsPromises.push(toBase64(file));
    });

    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => ({
      selectedFile: base64File
    }));
    console.log("mappedFiles", mappedFiles);
    setUploadedFiles(mappedFiles);
    // return mappedFiles;
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        type="file"
        id="upload"
        multiple
        onChange={fileHandler}
        accept="image/*"
      />
      <h2>{uploadedFiles.length}</h2>
      {uploadedFiles.map((uploadedFile, uploadIdx) => {
        return (
          <img
            key={uploadIdx}
            src={uploadedFile.selectedFile}
            id="upload_images"
            alt=""
            width="200"
          />
        );
      })}
      <button
        style={{ display: "block", right: "50%", top: "50%" }}
        onClick={resetFile}
      >
        Reset file
      </button>
    </div>
  );
}
