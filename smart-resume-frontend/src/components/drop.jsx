import React, { useState } from "react";

function Drop() {
  const [file, setFile] = useState(null);

  function handleFile(event) {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log("Selected File:", uploadedFile);
  }

  function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    console.log("Uploading:", file);

    // yaha backend ko file bhejna hoga
  }

  return (
    <div className="drop-container">
      <h3>
        Drop your resume here or choose a file
        <br /> PDF & DOCX only. Max 2MB file size.
      </h3>

      <form onSubmit={handleUpload}>
<div className="file-wrapper">
  <label className="btn">
    Select File
    <input type="file" onChange={handleFile} />
  </label>

  <span className="filename">
    {file ? file.name : "No file chosen"}
  </span>
</div>

      </form>
    </div>
  );
}

export default Drop;
