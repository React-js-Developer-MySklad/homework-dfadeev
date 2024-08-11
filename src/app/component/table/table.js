import table from "./table.html";
import { editForm } from "../modal/modal";

const contragentsTable = document.getElementById('contragents-table');
contragentsTable.innerHTML = table;

let contragents = new Map([
    [1, {name: "Имя1", inn: "ИНН1", address: "Адрес1", kpp: "КПП1"}],
    [2, {name: "Имя2", inn: "ИНН2", address: "Адрес2", kpp: "КПП2"}],
    [3, {name: "Имя3", inn: "ИНН3", address: "Адрес3", kpp: "КПП3"}]
]);

function loadContragents() {
    contragents.forEach((contragent, id) => addContragentRow(id, contragent));
}

export function saveContragent(id, contragent) {
    if (!id) {
        let lastId = Math.max(contragents.keys);
        addContragentRow(lastId++, contragent);
    } else {
        editContragentRow(id, contragent);
    }
};

function addContragentRow(id, contragent) {
    let rowTemplate = document.querySelector('#contragent-row-teplate');
    let newRow = rowTemplate.content.cloneNode(true);
    let th = newRow.querySelector('th');
    th.textContent = contragent.name;
    let td = newRow.querySelectorAll('td');
    td[0].textContent = id;
    td[1].textContent = contragent.inn;
    td[2].textContent = contragent.address;
    td[3].textContent = contragent.kpp;
    td[4].querySelector('button').addEventListener('click', () => deleteContragent(id));
    let tr = newRow.querySelector('tr')
    tr.setAttribute('id', 'contragent-' + id);
    tr.addEventListener('dblclick', (event) => { editForm(event) });
    contragentsTable.querySelector('tbody').appendChild(newRow);
};

function editContragentRow(id, contragent) {
    contragents.set(parseInt(id), contragent);
    let row = selectRowById(id);
    let th = row.querySelector('th');
    th.textContent = contragent.name;
    let td = row.querySelectorAll('td');
    td[1].textContent = contragent.inn;
    td[2].textContent = contragent.address;
    td[3].textContent = contragent.kpp;
}

function selectRowById(id) {
    return contragentsTable.querySelector("tbody tr#contragent-" + id);
}

function deleteContragent(id) {
    selectRowById(id).remove();
    contragents.delete(id);
};

window.onload = () => loadContragents();