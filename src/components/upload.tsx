import React, { useState } from "react";
import { validateFile, uploadFile } from "../services/upload";
import { Loading } from "./";
import { navigate } from "gatsby";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessage = validateFile(selectedFile);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      setIsLoading(true);
      await uploadFile(selectedFile);
      navigate("/?success=upload");
    } catch (e) {
      setErrorMessage(`Something went wrong: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setErrorMessage("");
    const file = event.target.files[0];
    const errorMessage = validateFile(file);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
    setSelectedFile(file);
  };

  const isInvalid = errorMessage ? "is-invalid" : "";

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className={`form-label ${isInvalid}`} htmlFor="upload">
          Upload your cat picture
        </label>
        <br />
        <input
          type="file"
          className={`form-control-file  ${isInvalid}`}
          id="upload"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </div>

      <div>
        <small className="form-text text-muted">
          Your file should be a JPG or PNG, be smaller than 10MB, contain a cat,
          and be appropriate for people of any age to see.
        </small>
      </div>
      <div className="btn-group my-3" role="group">
        <button className="btn btn-primary" type="submit">
          Upload
        </button>
      </div>
    </form>
  );
};
