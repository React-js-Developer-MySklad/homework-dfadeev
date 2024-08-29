import * as css from './table.module.css'
import React, {MouseEvent, useContext} from 'react';
import {Contragent, ContragentsApi, ContragentsContext} from '../../data/contragents';

type TableProps = {
    columnNames?: Array<String>,
    contragents?: Contragent[],
    onDeleteRow?: Function,
    onEditRow?: Function,
}

type RowProps = {
    id: string,
    row: Contragent,
    onDelete?: Function,
    onEdit?: Function
}

const defaultColumnNames = ['Наименование', 'ИНН', 'Адрес', 'КПП'];

export default ({columnNames = defaultColumnNames, contragents = [], onDeleteRow, onEditRow }: TableProps) => {

    const contragentsApi:ContragentsApi = useContext(ContragentsContext);

    const deleteRowHandler = (contragentId: string) => {
        console.log('deleteRowHandler table', contragentId);
        contragentsApi.delete(contragentId).then(() => onDeleteRow(contragentId));
    }

    return (
        <table className={css.table}>
            <thead className={css.thead}>
                <tr>
                    <th scope="col" className={css.cell}>
                        {columnNames[0]}
                    </th>
                    <th scope="col" className={css.cell}>
                        {columnNames[1]}
                    </th>
                    <th scope="col" className={css.cell}>
                        {columnNames[2]}
                    </th>
                    <th scope="col" className={css.cell}>
                        {columnNames[3]}
                    </th>
                    <th scope="col" className={css.cell}></th>
                </tr>
            </thead>
            <tbody>
                {contragents && contragents.map(contragent =>
                    <TableRow id={contragent.id} row={contragent} onDelete={deleteRowHandler} onEdit={onEditRow} key={contragent.id}/>
                )}
            </tbody>
        </table>
    );
};

function TableRow<T>({id, row, onDelete, onEdit }: RowProps) {

    const onDoubleClickRowHandler = (e: MouseEvent) => {
       console.log('onDoubleClickRowHandler', id); 
       e.stopPropagation();
       onEdit(id);
    }

    const onDeleteButtonHandler = (e: MouseEvent) => {
        console.log('onDeleteButtonHandler', id);
        e.stopPropagation();
        onDelete(id);
     }
 
    return (
        <tr className={css.row} onDoubleClick={onDoubleClickRowHandler}>
            <th scope="row" className={css.headCell} id="name">
                {row.name}
            </th>
            <td className={css.cell} id="id" hidden>
                {id ? id.toString() : ""}
            </td>
            <td className={css.cell} id="inn">
                {row.inn}
            </td>
            <td className={css.cell} id="address">
                {row.address}
            </td>
            <td className={css.cell} id="kpp">
                {row.kpp}
            </td>
            <td className={css.cell} id="button">
                <button type="button" className={css.delete_button} onClick={onDeleteButtonHandler}>
                    <svg className={css.delete_button_icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </td>
        </tr>
    );
 }

