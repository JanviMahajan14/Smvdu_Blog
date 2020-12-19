import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import M from 'materialize-css';
import axios from 'axios';
import '../../notes.css';


const Notes = () => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
     try {
    const { title, description } = state;
    if (title.trim() !== '' && description.trim() !== '') {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        setErrorMsg(''); 
        await axios.post("http://localhost:5000/notes/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });
        M.toast({ html: "Upload Successfull!", classes: "green darken-1" })
      } else {
        setErrorMsg('Please select a file to add.');
      }
    } else {
      setErrorMsg('Please enter all the field values.');
    }
  } catch (error) {
    error.response && setErrorMsg(error.response.data);
  }
  };

  const onDrop = (files) => {
  const [uploadedFile] = files;
  setFile(uploadedFile);
  const fileReader = new FileReader();
  fileReader.onload = () => {
    setPreviewSrc(fileReader.result);
  };
  fileReader.readAsDataURL(uploadedFile);
  setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
};

const updateBorder = (dragState) => {
  if (dragState === 'over') {
    dropRef.current.style.border = '2px solid #000';
  } else if (dragState === 'leave') {
    dropRef.current.style.border = '2px dashed #e9ebeb';
  }
};

    return (
      <div className="header">
        <div style={{ backgroundColor: "#01579b", color: "white", fontSize: "25px" }}><p style={{ margin: "0px", marginLeft: "20px"}}>Notes 📑</p></div>
        <h5>Share and download notes  <i class="fa fa-share-alt" aria-hidden="true"></i></h5>
            <div>
                <a class="waves-effect waves-light btn-small" style={{marginRight:"20px"}}><Link to='/notes/'exact={true} style={{color:"white"}}><i class="material-icons left">cloud</i>Home</Link></a>
                <a class="waves-effect waves-light btn-small"><Link to='/notes/list' style={{color:"white"}}><i class="material-icons right">cloud</i>Files</Link></a>
                <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
            <div className="upload-section">
  <Dropzone onDrop={onDrop}
    onDragEnter={() => updateBorder('over')}
    onDragLeave={() => updateBorder('leave')}
  >
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
        <input {...getInputProps()} />
        <p>Drag and drop a file OR click here to select a file</p>
        {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
        )}
      </div>
    )}
  </Dropzone>
  {previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" />
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <div className="preview-message">
      <p>Image preview will be shown here after selection</p>
    </div>
  )}
</div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
            </div>
        </div>
    );
};
export default Notes;