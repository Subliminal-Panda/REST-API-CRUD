import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../redux/store/store';
import { MDBFile } from 'mdb-react-ui-kit';
import { fetchFiles } from '../redux/actions/fileActions';
import { addFileSuccess, deleteFileSuccess, updateFileSuccess } from '../redux/reducers/filesReducer';
import { File } from '../redux/types/fileType';

function FileComponent() {
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const files: File[] = useSelector((state: RootState) => state.files);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    console.log({files});
  }, [files])

  const handleAddFile = async () => {
    try {
      const response = await axios.post<File>('api.optilogic.app/v0/${workspace}/file/${filePath}', {
        filename: fileName
      });
      dispatch(addFileSuccess(response.data));
      setFileName('');
      handleHideModal();
    } catch (error) {
      console.error('Error adding file:', error);
    }
  };

  const handleUpdateFile = async (updatedFile: File) => {
    try {
      const response = await axios.patch<File>(
        `api.optilogic.app/v0/storage/{storageName}/tags/${updatedFile.filePath}`,
        updatedFile
      );
      dispatch(updateFileSuccess(response.data));
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const handleDeleteFile = async (filePath: string) => {
    try {
      await axios.delete(`api.optilogic.app/v0/storage/{storageName}/tags/${filePath}`);
      dispatch(deleteFileSuccess(filePath));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container">
      <Button variant="primary" onClick={handleShowModal} className="w-25 mb-3" >Add File</Button>
      <Modal show={showModal} onHide={handleHideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
          />
          <MDBFile label='Default file input example' id='customFile' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>Close</Button>
          <Button variant="primary" onClick={handleAddFile}>Add</Button>
        </Modal.Footer>
      </Modal>

      {files ? (
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>File Name:</th>
              <th>Directory Path:</th>
              <th>Length:</th>
            </tr>
          </thead>
          <tbody>
          {files.map((file: File) => (
            <tr>
              <td>{file.filename}</td>
              <td>{file.directoryPath}</td>
              <td>{file.contentLength}</td>
              <td>
                <Button variant="warning" onClick={() => handleUpdateFile(file)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteFile(file.filePath)}>Delete</Button>
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
