import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchFilesSuccess } from '../redux/reducers/filesReducer';
import FileComponent from './FileComponent';

function WorkspaceSearch() {
    const [workspace, setWorkspace] = useState('')
    const [validWorkspace, setValidWorkspace] = useState(false)

    const dispatch = useDispatch()
    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                'https://api.optilogic.app/v0/' + workspace + '/files',
                {
                    headers: {
                        'X-APP-KEY': 'op_NTA4NDhmMzUtOTc4OC00YWI1LTk3ZWMtZTFjMmMzYzMwMWQz'
                    }
                }
            );
            dispatch(fetchFilesSuccess(response.data.files));
            setValidWorkspace(true);
        } catch (error) {
            setValidWorkspace(false);
            console.error('Error fetching files:', error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkspace(e.target.value)
    }
    return (
        <div>
            <Card className="pt-3 pb-2 py-5 container">
                <Card.Body>
                    <Form className="row align-items-center justify-content-center">
                        <Form.Group className="mb-3 w-75" controlId="workspace">
                            <Form.Control 
                                type="text"
                                value={workspace}
                                placeholder="Workspace Name"
                                onChange={handleChange} 
                                />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={fetchFiles}  className="w-25">
                        Find Files
                    </Button>
                </Card.Body>
                {validWorkspace ? 
                    <FileComponent workspace={workspace} /> : 
                    <p>
                        Please submit a valid workspace to query files.
                    </p>
                }
            </Card>
        </div>
    );
};

export default WorkspaceSearch;
