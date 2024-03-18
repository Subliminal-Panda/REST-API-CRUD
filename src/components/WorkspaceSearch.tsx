import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchFilesSuccess } from '../redux/reducers/filesReducer';
import { File } from '../redux/types/FileType';

function WorkspaceSearch() {
    const [workspace, setWorkspace] = useState('')

    const dispatch = useDispatch()
    const fetchFiles = async () => {
        try {
            const response = await axios.get<File[]>(
                'api.optilogic.app/v0/{$workspace}/files'
            );
            dispatch(fetchFilesSuccess(response.data));
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };
    return (
        <>
            <Button variant="primary" onClick={fetchFiles} >Find Files</Button>
        </>
    );
};

export default WorkspaceSearch;
