import modal from "./modal.html";
import { saveContragent } from "../table/table";

const contragentsModal = document.getElementById('contragents-modal');
contragentsModal.innerHTML = modal;

const contragentsSaveButton = document.querySelector('form button');
contragentsSaveButton.addEventListener('click', (event) => saveForm(event));

export function editForm(event) {
    fillForm(
        document.querySelector('form'),
        event.target.parentNode,
        ['id', 'name', 'address', 'inn', 'kpp']
    );

    window
        .FlowbiteInstances
        .getInstance('Modal', 'contragents-modal')
        ?.show();
};

function saveForm(event) {
    let form = event.target.parentNode;

    saveContragent(form.querySelector('#id').value, {
        name: form.querySelector('#name').value,
        inn: form.querySelector('#inn').value,
        address: form.querySelector('#address').value,
        kpp: form.querySelector('#kpp').value
    });

    form.reset();

    window
        .FlowbiteInstances
        .getInstance('Modal', 'contragents-modal')
        ?.hide();
};

function fillForm(form, row, fields) {
    fields.forEach(element => {
        let selector = '#' + element;
        form.querySelector(selector).value = row.querySelector(selector).textContent;
    });
};