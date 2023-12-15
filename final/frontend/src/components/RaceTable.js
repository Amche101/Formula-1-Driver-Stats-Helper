import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const RaceTable = ({ roundResult }) => {
    // {Position, name:{firstName, lastName}, time, points, status}
    const navigate = useNavigate();

    const columns = useMemo(
        () => [
            {   
                accessorKey: 'position',
                header: 'Position',
                size: 150
            },
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
                accessorKey: 'constructor',
                header: 'Constructor',
                size: 150
            },
            {
                accessorKey: 'time',
                header: 'Time',
                size: 150
            },
            {
                accessorKey: 'points',
                header: 'Points',
                size: 150
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150
            }
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: roundResult,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
              navigate(`/driver/${row.original.driver_id}`);
            },
            sx: {
              cursor: 'pointer'
            },
        }),
    });

    return(
        <div className="race-table">
            <MaterialReactTable table={table} />
        </div>
    );
}
 
export default RaceTable;
