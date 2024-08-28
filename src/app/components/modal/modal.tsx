import {Contragent, ContragentsApi, ContragentsContext} from '../../data/contragents';
import * as css from './modal.module.css'
import {FormEvent, useContext, useEffect, useState} from 'react';
import { Form, Field } from 'react-final-form'
import {composeValidators, innFormat, minLength, numbersOnly, required} from "./validations";

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

    const onSubmitForm = (values:any) => {
        const contragent: Contragent = {
            id: values.id,
            name: values.name,
            inn: values.inn,
            address: values.address,
            kpp: values.kpp,
        }
        const onResponse = () => {
            setContragent(contragent);
            onSaveButton(values.id, contragent);
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
                        <Form onSubmit={onSubmitForm} render={({handleSubmit}) => (
                            <form className={css.form} onSubmit={handleSubmit}>
                                    <Field name="id" defaultValue={contragentId}>
                                        {
                                            ({ input }) => (
                                                <div>
                                                    <input {...input} type="text" name="id" id="id" hidden/>
                                                </div>
                                            )
                                        }
                                    </Field>
                                    <Field name="name" validate={composeValidators(required, minLength(3))} defaultValue={contragent.name}>
                                        {
                                            ({ input, meta }) => (
                                                <div>
                                                    <label htmlFor="name" className={css.input_label}>Наименование</label>
                                                    <input {...input} type="text" className={css.input}/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )
                                        }
                                    </Field>
                                    <Field name="kpp" validate={composeValidators(required, numbersOnly, minLength(10))} defaultValue={contragent.kpp}>
                                        {
                                            ({ input, meta }) => (
                                                <div>
                                                    <label htmlFor="kpp" className={css.input_label}>КПП</label>
                                                    <input {...input} type="text" className={css.input}/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )
                                        }
                                    </Field>
                                    <Field name="address" validate={composeValidators(required, minLength(5))} defaultValue={contragent.address}>
                                        {
                                            ({ input, meta }) => (
                                                <div>
                                                    <label htmlFor="address" className={css.input_label}>Адрес</label>
                                                    <input {...input} type="text" className={css.input}/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )
                                        }
                                    </Field>
                                    <Field name="inn" validate={composeValidators(required, innFormat)} defaultValue={contragent.inn}>
                                        {
                                            ({ input, meta }) => (
                                                <div>
                                                    <label htmlFor="inn" className={css.input_label}>ИНН</label>
                                                    <input {...input} type="text" className={css.input}/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )
                                        }
                                    </Field>
                                <button type="submit" className={css.save_button}>Сохранить</button>
                            </form>
                        )}>
                        </Form>
                    </div>
                </div>
            </div>
            <div id="modal-backdrop" className={css.backdrop}></div>
        </div>

    );
}