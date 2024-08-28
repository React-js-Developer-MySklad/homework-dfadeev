import {Contragent, ContragentsApi, ContragentsContext} from '../../data/contragents';
import * as css from './modal.module.css'
import {FormEvent, useContext, useEffect, useState} from 'react';

type Props = {
    title?: string;
    contragentId: string;
    onCloseForm: Function;
    onSaveButton: Function;
}

interface FormElements extends HTMLFormControlsCollection {
    id: HTMLInputElement,
    name: HTMLInputElement,
    inn: HTMLInputElement,
    kpp: HTMLInputElement,
    address: HTMLInputElement
}

interface ContragentsFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default ({title = 'Контрагент', contragentId, onSaveButton, onCloseForm}: Props) => {

    const contragentsApi:ContragentsApi = useContext(ContragentsContext)
    const [contragent, setContragent] = useState<Contragent>({});

    const onCloseButton = () => {
        onCloseForm();
    }

    const onSaveButtonHandler = (e: FormEvent<ContragentsFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        const contragent: Contragent = {
            id: form.id.value,
            name: form.name.value,
            inn: form.inn.value,
            address: form.address.value,
            kpp: form.kpp.value,
        }
        const onResponse = () => {
            setContragent(contragent);
            onSaveButton(form.id.value, contragent);
            onCloseForm();
        }

        contragent.id
            ? contragentsApi.update(contragent).then(onResponse)
            : contragentsApi.save(contragent).then(onResponse);
    }

    contragentId && useEffect(() => {
         contragentsApi
            .get(contragentId)
            .then(data => {
                setContragent(data ? data : {});
            });
    }, []);

    return (
        <div id="contragents-modal" tabIndex={-1} className={css.contragents_modal}>
            <div className={css.modal}>
                <div className={css.content}>

                    <div className={css.header}>
                        <h3 className={css.header_title}>
                            {title}
                        </h3>
                        <button type="button" className={css.close_button} data-modal-hide="contragents-modal"
                                onClick={onCloseButton} data-testid="modal-close-button">
                            <svg className={css.close_button_icon} xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>

                    <div className={css.main}>
                        <form className={css.form} onSubmit={onSaveButtonHandler}>
                            <div>
                                <input type="text" name="id" id="id" hidden defaultValue={contragentId}/>
                            </div>
                            <div>
                                <label htmlFor="name" className={css.input_label}>Наименование</label>
                                <input type="text" name="name" id="name" className={css.input} placeholder=""
                                       defaultValue={contragent.name} required/>
                            </div>
                            <div>
                                <label htmlFor="kpp" className={css.input_label}>КПП</label>
                                <input type="text" name="kpp" id="kpp" className={css.input} placeholder=""
                                       defaultValue={contragent.kpp} required/>
                            </div>
                            <div>
                                <label htmlFor="address" className={css.input_label}>Адрес</label>
                                <input type="text" name="address" id="address" className={css.input} placeholder=""
                                       defaultValue={contragent.address} required/>
                            </div>
                            <div>
                                <label htmlFor="inn" className={css.input_label}>ИНН</label>
                                <input type="text" name="inn" id="inn" className={css.input} placeholder=""
                                       defaultValue={contragent.inn} required/>
                            </div>
                            <button type="submit" className={css.save_button}>Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="modal-backdrop" className={css.backdrop}></div>
        </div>

    );
}