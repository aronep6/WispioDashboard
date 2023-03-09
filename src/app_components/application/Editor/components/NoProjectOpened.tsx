import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../../../app_atomic/Button';

function NoProjectOpened() {
    return (
        <div>
            No project opened, you need to open a project to use the editor
            <Link to="/editor/default">
                <PrimaryButton>
                    Open the default project
                </PrimaryButton>
            </Link>
        </div>
    );
}

export default NoProjectOpened;