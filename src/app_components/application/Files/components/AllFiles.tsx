import { Fragment } from 'react';
import { ApplicationFile } from '../../../../app_common/Service/Application/FilesService/interfaces';

const AllFiles = ({ files }: { files: ApplicationFile[] }) => {
    return <Fragment>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
                JSON.stringify(files)
            }
        </div>
    </Fragment>
};

export default AllFiles