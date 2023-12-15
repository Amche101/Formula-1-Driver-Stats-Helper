import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const DriverTable = ({ driverResult }) => {
    const navigate = useNavigate();

    const columns = useMemo(
        () => [
            {   
                accessorKey: 'name.firstName',
                header: 'First Name',
                size: 150
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
                size: 150
            },
            {
                accessorKey: 'permenantNumber',
                header: 'Permenant Number',
                size: 150
            },
            {
                accessorKey: 'code',
                header: 'Code',
                size: 150
            },
            {
                accessorKey: 'dateOfBirth',
                header: 'Date of Birth',
                size: 150
            },
            {
                accessorKey: 'nationality',
                header: 'Nationality',
                size: 150
            }
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: driverResult,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
              navigate(`/driver/${row.original.driverId}`);
            },
            sx: {
              cursor: 'pointer'
            },
        }),
    });

    return (
        <div className="driver-table">
            <MaterialReactTable table={table} />
        </div>
    );
}
 
export default DriverTable;