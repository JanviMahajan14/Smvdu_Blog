import React, { useState, useEffect } from 'react';
import download from 'downloadjs'; 
import axios from 'axios';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/getAllFiles", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
        setErrorMsg('No files found');
      }
      }
    };
    getFilesList();
  }, []);
  const downloadFile = async (id, path, mimetype) => {
    try {
      const result =  await axios.get(`http://localhost:5000/download/${id}`, {
            responseType: 'blob'
      });
      
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
  return (
    <div>
      <div style={{ backgroundColor: "#01579b", color: "white", fontSize: "25px" }}><p style={{ margin: "0px", marginLeft: "20px" }}>Saved Notes 📖</p></div>
      <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <h5 style={{ color: "#039be5", margin: "20px" }}>Download your Notes <i class="fa fa-download" aria-hidden="true"></i> </h5>
      <table className="files-table" style={{marginLeft:"20px"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};
export default FilesList;