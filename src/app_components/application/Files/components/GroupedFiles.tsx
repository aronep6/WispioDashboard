import { Fragment } from 'react';
import { ApplicationFile } from '../../../../app_common/Service/Application/FilesService/interfaces';
import SingleFile from './SingleFile';

const GroupedFiles = ({ files }: { files: ApplicationFile[] }) => {
    return <Fragment>
        <div className="flex gap-4">
            { 
                files.map((file, index) => <SingleFile key={index} file={file} />)
            }
        </div>
    </Fragment>
};

export default GroupedFiles;