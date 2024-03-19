import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store/store';
import { fetchFiles } from '../redux/actions/fileActions';
import { addFileSuccess, deleteFileSuccess } from '../redux/reducers/filesReducer';
import { File } from '../redux/types/fileType';

interface fileComponentProps {
  workspace: string;
}

function FileComponent(props: fileComponentProps) {
  const workspace = props.workspace

  const [directoryPath, setDirectoryPath] = useState('');
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fileToUpload, setFileToUpload] = useState('');

  const dispatch = useDispatch();
  const files: File[] = useSelector((state: RootState) => state.files);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    const config: AxiosRequestConfig = {
      headers: {
        // Attempt 1 to set required content type for POST endpoint
        'Content-Type': 'application/octet-stream',
        'X-APP-KEY': process.env.REACT_APP_OPTILOGIC_APP_KEY
      },
      transformRequest: [(data: any, headers: any) => {
        // Attempt 2 to set required content type for POST endpoint
        headers['Content-Type'] = 'application/octet-stream';
        if (data instanceof FormData) {
          return data;
        }
        const formData = new FormData();
        formData.append('file', data);
        return formData;
      }],
    };

    const instance = axios.create();
    // Attempt 3 to set required content type for POST endpoint- if this still doesn't work, axios might just not be ideal
    instance.defaults.headers.post['Content-Type'] = 'application/octet-stream'

    try {
      const response = await instance.post(
        process.env.REACT_APP_OPTILOGIC_API + workspace + '/file/' + directoryPath.replace(/^\/|\/$/g, '') + '/' + fileName.replace(/^\/|\/$/g, ''),
        formData,
        config
      );
      dispatch(addFileSuccess(response.data));
      setDirectoryPath('');
      setFileName('');
      handleHideModal();
    } catch (error) {
      console.error('Error adding file:', error);
    }
  };

  const handleDeleteFile = async (directoryPath: string, fileName: string) => {
    try {
      await axios.delete(
        process.env.REACT_APP_OPTILOGIC_API + workspace + '/file/' + directoryPath.replace(/^\/|\/$/g, '') + '/' + fileName.replace(/^\/|\/$/g, ''),
        {
          headers: {
            'X-APP-KEY': process.env.REACT_APP_OPTILOGIC_APP_KEY
          }
        }
      );
      dispatch(deleteFileSuccess(directoryPath + '/' + fileName));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleAddFile = (e: any) => {
    setFileToUpload(e.target.files[0])
  }

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container">
      <Button variant="info" onClick={handleShowModal} className="w-15 mb-3" >Add file to workspace</Button>
      <Modal show={showModal} onHide={handleHideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add file to {workspace} workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Directory Path"
            value={directoryPath}
            onChange={e => setDirectoryPath(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            type="file"
            onChange={e => handleAddFile(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>Close</Button>
          <Button variant="primary" onClick={handleUploadFile}>Add</Button>
        </Modal.Footer>
      </Modal>

      {files ? (
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>Directory Path:</th>
              <th>File Name:</th>
              <th>Length:</th>
            </tr>
          </thead>
          <tbody>
          {files.map((file: File) => (
            <tr key={file.filePath}>
              <td>{file.directoryPath}</td>
              <td>{file.filename}</td>
              <td>{file.contentLength}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteFile(file.directoryPath, file.filename)}>Delete</Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
          ) : (
        <p>No files found</p>
      )}

    </div>
  );
};

export default FileComponent;
