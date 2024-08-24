import React from "react";
import Modal from "./modal";
import {fireEvent, screen, render} from "@testing-library/react";


const onInit = jest.fn();
const onClose = jest.fn();
const onSave = jest.fn();

describe('Contragent modal tests', () => {
    it('Show modal without contragent', () => {
        const {getByText, getByLabelText} = render(<Modal contragentId={0} onCloseForm={onClose} onSaveHandler={onSave} onInit={onInit} />);

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
                name: "name",
                inn: "inn",
                kpp: "kpp",
                address: "address"
            }
        };
        const {getByText, getByDisplayValue} = render(<Modal contragentId={0} onCloseForm={onClose} onSaveHandler={onSave} onInit={contragent} />);

        expect(getByText('Контрагент')).toBeTruthy();
        expect(getByDisplayValue('name')).toBeTruthy();
        expect(getByDisplayValue('address')).toBeTruthy();
    });

    it('Call onCloseForm when on click close button', () => {
        render(<Modal contragentId={0} onCloseForm={onClose} onSaveHandler={onSave} onInit={onInit} />);

        fireEvent.click(screen.getByTestId('modal-close-button'));

        expect(onClose).toHaveBeenCalled();
    });

});