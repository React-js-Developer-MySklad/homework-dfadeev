import {createContext} from "react";

export interface Contragent {
  id?: string
  name?: string;
  inn?: string;
  kpp?: string;
  address?: string;
}

export class ContragentsApi {

  contragentsApiUrl:string = 'http://localhost:3000/contragents';

  getAll() {
    return fetch(this.contragentsApiUrl, {method: 'GET'})
        .then(response => response.json())
        .catch(error => console.error(error));
  }

  get(id: string) {
      return fetch(this.contragentsApiUrl + `/${id}`, {method: 'GET'})
          .then(response => response.json())
          .catch(error => console.error(error));
  }

  save(contragent:Contragent) {
    delete contragent.id;
    return fetch(this.contragentsApiUrl, {method: 'POST', body: JSON.stringify(contragent)})
          .then(response => response.json())
          .catch(error => console.error(error));
  }

  update(contragent:Contragent) {
    return fetch(this.contragentsApiUrl + `/${contragent.id}`, {method: 'PATCH', body: JSON.stringify(contragent)})
        .then(response => response.json())
        .catch(error => console.error(error))
  }

  delete(id: string) {
    return fetch(this.contragentsApiUrl + `/${id}`, {method: 'DELETE'})
        .then(response => response.json())
        .catch(error => console.error(error))
  }

}

export const ContragentsContext = createContext(null);
