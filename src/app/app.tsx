import {createContext, useEffect, useState} from 'react';
import * as css from './app.module.css'
import Footer from './components/footer/footer'
import Header from './components/header/header';
import Table from './components/table/table';
import {Contragent, ContragentsApi, ContragentsContext} from './data/contragents';
import Modal from './components/modal/modal';

export default () => {

    const contragentsApi = new ContragentsApi();
    const [contragents, setContragents] = useState<Contragent[]>();
    const [editMode, setEditMode] = useState({ isEditMode: false, contragentId: undefined });

    const deleteRowHandler = (contragentId: number) => {
        updateContragents();
    };

    const editFormHandler = (contragentId?: number) => {
        setEditMode({
            ...editMode,
            isEditMode: true,
            contragentId: contragentId
        });
    };

    const closeFormHandler = () => {
        setEditMode({
            ...editMode,
            isEditMode: false
        });
    };

    const saveFormHandler = (contragent: Contragent) => {
        setEditMode({
            ...editMode,
            isEditMode: false
        });
        updateContragents();
    };

    const updateContragents = () => {
        contragentsApi.getAll().then(data => {
            setContragents(Array.from(data))
        });
    };

    useEffect(() => {
        updateContragents();
    }, []);

    return (
        <ContragentsContext.Provider value={contragentsApi}>
            <div className={css.app}>
                <header className={css.header}>
                    <Header onOpenForm={editFormHandler}/>
                </header>
                <main className={css.main}>
                    <Table contragents={contragents} onDeleteRow={deleteRowHandler} onEditRow={editFormHandler} />
                    { editMode.isEditMode &&
                        <Modal contragentId={editMode.contragentId}
                            onCloseForm={closeFormHandler}
                            onSaveButton={saveFormHandler}
                        />
                    }
                </main>
                <footer className={css.footer}>
                    <Footer />
                </footer>
            </div>
        </ContragentsContext.Provider>
    );
};
