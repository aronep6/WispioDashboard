import { Fragment } from 'react';
import { SingleInformationTableRowInterface } from './interfaces';
import './styles.css';

const Row = ({ row, }: { row: SingleInformationTableRowInterface }) => {
    const { key, value } = row;
    return <Fragment>
        <td className="py-2.5 px-1 text-left text-slate-600 text-sm"> {key} </td>
        <td className="py-2.5 px-1 text-left text-sm"> {value} </td>
    </Fragment>
}

const SubRow = ({ row }: { row: SingleInformationTableRowInterface }) => {
    const { key, value } = row;
    return <Fragment>
        <td className="py-2.5 px-2 text-left bg-slate-100 text-slate-600 text-sm"> ↳ {key} </td>
        <td className="py-2.5 px-1 bg-slate-100 text-left text-sm"> {value} </td>
    </Fragment>
}

const InformationTable = ({ table }: { table: SingleInformationTableRowInterface[] }) => {
    const lastIdx = table.length - 1;
    return <table className="w-full font-medium information-table">
        <tbody>
            {table.map((row, index) => {
                return <tr key={index} className={`${lastIdx !== index && "border-b"} border-gray-200 hover:bg-slate-200`}>
                    {row.isSubRow ? <SubRow row={row} /> : <Row row={row} />}
                </tr>
            })}
        </tbody>
    </table>
};

export default InformationTable;