import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideMenu from './SideMenu';

const FileUpload = (props) => {
    const user = localStorage.getItem('user');
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState(`Choose ${props.value} Picture`);

    const setFileHandler = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const uploadFileHandler = async e => {
        e.preventDefault();
        let id = user.id ? user.id : 0;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        console.log(formData);

        try {
            let response = await fetch("/api/uploadUniPic", {
              method: "POST",
              body: formData,
            })
      
            if (response.status != 200) {
              throw new Error(response.status);
            } else {
              let data = response.json();
              console.log(`Success: ${data}`);
            }
          } catch (error) {
            console.error("Error:", error);
          }

          setFilename(`Choose ${props.value} Picture`);
          setFile('');
    }
    
    return (
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <SideMenu type={props.type} />
                </Col>
                <Col xs={2}>
                    <form onSubmit={uploadFileHandler}>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input mt-4" id="customFile" onChange={setFileHandler} />
                            <label className="custom-file-label" htmlFor="customFile"> {filename} </label>
                        </div>
                        <input type="submit" value="Upload" className="btn btn-primary btn-block" />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default FileUpload;