import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchFilesSuccess } from '../redux/reducers/filesReducer';
import FileComponent from './FileComponent';

function WorkspaceSearch() {
    const [workspace, setWorkspace] = useState('')
    const [validWorkspace, setValidWorkspace] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const fetchFiles = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                process.env.REACT_APP_OPTILOGIC_API + workspace + '/files',
                {
                    headers: {
                        'X-APP-KEY': process.env.REACT_APP_OPTILOGIC_APP_KEY
                    }
                }
            );
            dispatch(fetchFilesSuccess(response.data.files));
            setValidWorkspace(true);
            setIsLoading(false)
        } catch (error) {
            setValidWorkspace(false);
            setIsLoading(false)
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
                    {!isLoading ? (
                        <>
                            <Form onSubmit={fetchFiles} className="row align-items-center justify-content-center">
                                <Form.Group className="w-75" controlId="workspace">
                                    <Form.Control 
                                        type="text"
                                        value={workspace}
                                        placeholder="Workspace Name"
                                        onChange={handleChange} 
                                        />
                                    <Button variant="primary" type="submit"  className="mt-3">
                                        Find Files
                                    </Button>
                                </Form.Group>
                            </Form>
                        </>
                    ) : (
                        <Spinner />
                    )}
                </Card.Body>

                {validWorkspace && !isLoading ? 
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
