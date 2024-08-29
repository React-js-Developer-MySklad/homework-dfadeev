import React from "react";
import Modal from "./modal";
import {fireEvent, screen, render, waitFor} from "@testing-library/react";
import {ContragentsContext, ContragentsApi} from "../../data/contragents";

const onClose = jest.fn();
const onSave = jest.fn();

describe('Contragent modal tests', () => {
    it('Show modal without contragent', () => {
        ContragentsApi.prototype.get = jest.fn((id:string):Promise<any> => {
            return Promise.resolve({})
        });
        const api = jest.mocked(new ContragentsApi());
        const {getByText, getByLabelText} = render(
            <ContragentsContext.Provider value={api}>
                <Modal contragentId={undefined} onCloseForm={onClose} onSaveButton={onSave} />
            </ContragentsContext.Provider>);

        expect(getByText('Контрагент')).toBeTruthy();
        expect(getByLabelText('Наименование')).toHaveProperty("id", "name");
        expect(getByLabelText('Адрес')).toHaveProperty("id", "address");
        expect(getByLabelText('ИНН')).toHaveProperty("id", "inn");
        expect(getByLabelText('КПП')).toHaveProperty("id", "kpp");

        expect(getByLabelText('Наименование')).toBeTruthy();
        expect(getByLabelText('Адрес')).toBeTruthy();
        expect(getByLabelText('ИНН')).toBeTruthy();
        expect(getByLabelText('КПП')).toBeTruthy();
    });
    it('Show modal with contragent', () => {
        const contragent = () => {
            return {
                id: "1",
                name: "name",
                inn: "inn",
                kpp: "kpp",
                address: "address"
            }
        };
        ContragentsApi.prototype.get = jest.fn((id:string):Promise<any> => {
            return Promise.resolve(() => contragent)
        });
        const api = jest.mocked(new ContragentsApi());
        const {getByText, getByDisplayValue, } = render(
            <ContragentsContext.Provider value={api}>
                <Modal contragentId={"1"} onCloseForm={onClose} onSaveButton={onSave} />
            </ContragentsContext.Provider>);

        expect(getByText('Контрагент')).toBeTruthy();

        expect(waitFor(() => getByDisplayValue('name'))).toBeTruthy();
        expect(waitFor(() => getByDisplayValue('address'))).toBeTruthy();
    });

    it('Call onCloseForm when on click close button', () => {
        const api = jest.mocked(new ContragentsApi());
        render(
            <ContragentsContext.Provider value={api}>
                <Modal contragentId={undefined} onCloseForm={onClose} onSaveButton={onSave} />
            </ContragentsContext.Provider>);

        fireEvent.click(screen.getByTestId('modal-close-button'));

        expect(onClose).toHaveBeenCalled();
    });

});