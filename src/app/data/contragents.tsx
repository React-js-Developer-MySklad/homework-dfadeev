export interface Contragent {
  name: String;
  inn: String;
  kpp: String;
  address: String;
}

export const contragents: Map<number, Contragent> = new Map<number, Contragent>([
  [1, { name: "Имя1", inn: "ИНН1", address: "Адрес1", kpp: "КПП1" }],
  [2, { name: "Имя2", inn: "ИНН2", address: "Адрес2", kpp: "КПП2" }],
  [3, { name: "Имя3", inn: "ИНН3", address: "Адрес3", kpp: "КПП3" }],
]);

