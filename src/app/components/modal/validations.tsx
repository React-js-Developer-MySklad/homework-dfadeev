export const minLength = (min:number) => (value:string) =>
    value && value.length >= min ? undefined : `Минимальное число символов ${min}`;

export const required = (value:any) =>
    value ? undefined : `Поле обязательное`;

export const numbersOnly = (value:any) =>
    /[^0-9]/.test(value) ? `Поле должно содержать только цифры` : undefined;

export const innFormat = (value:any) => {
    if (/[^0-9]/.test(value)) {
        return 'ИНН может состоять только из цифр';
    } else if ([10, 12].indexOf(value.length) === -1) {
        return 'ИНН может состоять только из 10 или 12 цифр';
    } else {
        let innArr = Array.from(value, Number);
        const checkDigit = (inn:number[], coefficients:number[]) => {
            let n = 0;
            for (let i in coefficients) {
                n += coefficients[i] * inn[i];
            }
            return n % 11 % 10;
        };
        let invalid = false;
        switch (innArr.length) {
            case 10:
                var n10 = checkDigit(innArr, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === innArr[9]) {
                    invalid = true;
                }
                break;
            case 12:
                var n11 = checkDigit(innArr, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                var n12 = checkDigit(innArr, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === innArr[10]) && (n12 === innArr[11])) {
                    invalid = true;
                }
                break;
        }
        if (!invalid) {
            return 'Неправильное контрольное число';
        }
    }
    return undefined;
}

export const composeValidators = (...validators:any[]) => (value:any) =>
    validators.reduce((error, validator) => error || validator(value), undefined)