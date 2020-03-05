import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

/*Funções no javascript*/
/*Funções que recebem o tipo monadico Exemplo -> notasM*/
/*Recebe as notas*/
const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
/*Filtra itens pelo codigo*/
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
/*Soma as notas*/
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
    listAll() {
        return fetch(API)
            // lida com o status da requisição
            .then(handleStatus)
            .then(notas => Maybe.of(notas))
            .catch(err => {
                // a responsável pelo logo é do serviço
                console.log(err);
                // retorna uma mensagem de alto nível
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },
    sumItems(code) {

        // utilizando partialize
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(
            getItemsFromNotas,
            filterItems,
            sumItemsValue
        );

        // realizando a composição
        return this.listAll()
            .then(sumItems)
            // obtendo o valor da monada 
            .then(result => result.getOrElse(0));
    }
}