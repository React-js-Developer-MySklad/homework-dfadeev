import { useState } from 'react';
import * as css from './app.module.css'
import Footer from './components/footer/footer'
import Header from './components/header/header';
import Table from './components/table/table';
import { Contragent, contragents } from './data/contragents';
import Modal from './components/modal/modal';

export default () => {

    const [data, setData] = useState(contragents);
    const [editMode, setEditMode] = useState({ idEditMode: false, contragentId: undefined });

    const deleteRowHandler = (contragentId: number) => {
        console.log('deleteRowHandler', contragentId);
        setData(data => {
            data.delete(contragentId);
            console.log(data);
            return new Map(data);
        })
    }

    const editFormHandler = (contragentId?: number) => {
        console.log('editFormHandler', contragentId);
        let lastId = Math.max(...Array.from(data.keys()));
        const id = contragentId ? contragentId : ++lastId;
        setEditMode({
            ...editMode,
            idEditMode: true,
            contragentId: id
        });
    }

    const closeFormHandler = () => {
        console.log('closeFormHandler');
        setEditMode({
            ...editMode,
            idEditMode: false
        });
    }

    const saveFormHandler = (id: number, contragent: Contragent) => {
        console.log('saveFormHandler before', id, contragent);
        setData(data => {
            data.set(id*1 /* почему-то set() превращает number в string */, contragent);
            return new Map(data);
        });
        console.log(data);
    }

    const openFormHandler = (id: number) => {
        return data.get(id);
    }

    return (
        <div className={css.app}>
            <header className={css.header}>
                <Header onOpenForm={editFormHandler}/>
            </header>
            <main className={css.main}>
                {data && 
                    <Table contragents={data}
                        onDeleteRow={deleteRowHandler}
                        onEditRow={editFormHandler}
                    />
                }
                { editMode.idEditMode &&
                    <Modal contragentId={editMode.contragentId}
                        onInit={openFormHandler}
                        onCloseForm={closeFormHandler}
                        onSaveHandler={saveFormHandler}
                    />
                }
            </main>
            <footer className={css.footer}>
                <Footer />
            </footer>
        </div>
    )
};
