import { nameIsValid, fullTrim, getTotal } from "../../../src/app.js";

describe ('nameIsValid', () => {
    test ('Должно возвращать true для имени более 2 символов в нижнем регистре', () => {
        expect(nameIsValid('max')).toBe(true);
    })
    test ('Должно возвращать false для имени 1 символ в нижнем регистре', () => {
        expect(nameIsValid('m')).toBe(false);
    })
    test('Должен возвращать false, если в имени есть символ в верхнем регистре', () => {
        expect(nameIsValid('Maksim')).toBe(false);
    })
});

describe ('fullTrim', () => {
    test('Удаление обычных пробелов', () => {
        expect(fullTrim('Hello World')).toBe('HelloWorld');
    })
    test('Удаление пробелов в начале', () => {
        expect(fullTrim('    Hello')).toBe('Hello');
    })
    test('Удаление пробелов в конце', () => {
        expect(fullTrim('World           ')).toBe('World');
    }
    )
});

describe ('getTotal', () =>{
    test('Расчет суммы одного товара без скидки', () =>{
        const items = [{price: 10, quantity: 10}];
        const result = getTotal(items);
        expect(result).toBe(100);
    })
    test('Скидка 10%',() =>{
        const items = [{price: 10, quantity: 10}];
        const discount = 10;
        const result = getTotal(items,discount);
        expect(result).toBe(90);
    })
    test('Выдаст ошибку если discount = !number',() => {
        const items = [{price: 10, quantity: 10}];
        const discount = '10';
        expect(() => getTotal(items,discount)).toThrow('Скидка должна быть числом');
    })
test.each([
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 10 }], 0, 100]
])('считает сумму заказа', (items, discount, expected) => {
  expect(getTotal(items, discount)).toBe(expected);
});
});