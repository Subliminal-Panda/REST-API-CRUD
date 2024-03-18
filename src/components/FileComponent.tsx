import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../redux/store/store';
import { MDBFile } from 'mdb-react-ui-kit';
import { Buffer } from 'buffer';
import { fetchFiles } from '../redux/actions/fileActions';
import { addFileSuccess, deleteFileSuccess, updateFileSuccess } from '../redux/reducers/filesReducer';
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
  useEffect(() => {
    console.log({workspace})
  }, [workspace]);

  const handleAddFile = async () => {
    try {
      // @ts-expect-error
      let dataInBuffer = new Buffer.from(fileToUpload);

      let formData = new FormData();

      formData.append('items', new Blob([JSON.stringify({
          name: fileName,
          data: dataInBuffer
      })], {
          type: "application/octet-stream"
      }));

      console.log('created formData.')
      const response = await axios.post(
        'https://api.optilogic.app/v0/' + workspace + '/file/' + directoryPath + '/' + fileName,
          {transformRequest: [(data: any, headers: any) => {
            delete headers.common.contentType;
            data.append(formData);
            return data 
        }]},
        {
          headers: {
            'X-APP-KEY': 'op_NTA4NDhmMzUtOTc4OC00YWI1LTk3ZWMtZTFjMmMzYzMwMWQz',
            'content-type': 'application/octet-stream'
          },
        }
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
        'https://api.optilogic.app/v0/' + workspace + '/file' + directoryPath + '/' + fileName,
        {
          headers: {
            'X-APP-KEY': 'op_NTA4NDhmMzUtOTc4OC00YWI1LTk3ZWMtZTFjMmMzYzMwMWQz'
          }
        }
      );
      dispatch(deleteFileSuccess(directoryPath + '/' + fileName));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleUploadFile = (e: any) => {
    setFileToUpload(e.target.files)
  }

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container">
      <Button variant="info" onClick={handleShowModal} className="w-25 mb-3" >Add file to {workspace} workspace</Button>
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
            onChange={e => handleUploadFile(e)}
          />
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
            <tr key={file.filePath}>
              <td>{file.filename}</td>
              <td>{file.directoryPath}</td>
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
