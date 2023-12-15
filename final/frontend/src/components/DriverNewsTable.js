import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const DriverNewsTable = ({ driverTitleUrl }) => {
    const columns = useMemo(
        () => [
            {   
                accessorKey: 'title',
                header: 'Title',
                size: 150
            },
            {   
                accessorKey: 'url',
                header: 'URL',
                size: 150
            }
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: driverTitleUrl
    });

    return (
        <div className="driver-news-table">
            <MaterialReactTable table={table} />
        </div>
    );
}
 
export default DriverNewsTable;