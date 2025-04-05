/**валидация  */

export function stringInputValidation(string: string): boolean {
    const validateLogin = (input: string) => /^[а-яА-ЯёЁa-zA-Z-]{2,15}$/.test(input);
    return validateLogin(string);
}

// export function stringInputValidationLogin(string: string): boolean {
//     const validateLogin = (input: string) => /^(?=.*\d)[а-яА-ЯёЁa-zA-Z0-9-]{2,20}$/.test(input);
//     // return validateLogin(string);
//     // return string
// }

export function stringInputValidationMail(email: string): boolean {

    const validateMail = (input: string) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(String(input).toLowerCase());
      
    
    return validateMail(email)
}

export function stringInputValidationNumber(string: string): boolean {
    const validatePhone = (input: string) => /^\s*(?:\+7|7|8)?\s*\(?(\d{3})\)?\s*(\d{3})\s*[-]?(\d{2})\s*[-]?(\d{2})\s*$/.test(input);
    return validatePhone(string);
}

export function passwordValid(string: string): boolean {
    const validatePassword = (input: string) => /^(?=.*\d).{8,}$/.test(input);
    return validatePassword(string);
}

export function addressValid(string: string): boolean {
    const reg = /^(?:г\.|город|с\.|п\.|пос\.|дер\.|район|р-н)?\s*([А-Яа-яёЁ]+\s+)?([А-Яа-яёЁ]+\s*[-\w]*\.?\s*)(?:д\.?\s*\d+[a-zA-Zа-яёА-Я]*,?)?\s*(.*?)\s*,?\s*(\d{6})?$/;
    const valid = (input: string) => reg.test(input);
    return valid(string.trim());
}

export const formatPhoneNumber = (value: string) => {
    // Убираем все нецифровые символы, кроме "+"
    let filterValue = value.replace(/\D+/g, "");
  
    // Если поле пустое, позволяем оставить пустым
    if (filterValue === "") return "";
  
    // Если пользователь начал ввод заново и нет "+7", добавляем его
    if (!filterValue.startsWith("7")) {
      filterValue = "7" + filterValue;
    }
  
    // Ограничиваем длину в 11 цифр
    filterValue = filterValue.slice(0, 11);
  
    let formatted = "+7";
  
    if (filterValue.length > 1) formatted += ` (${filterValue.slice(1, 4)}`;
    if (filterValue.length > 4) formatted += `) ${filterValue.slice(4, 7)}`;
    if (filterValue.length > 7) formatted += `-${filterValue.slice(7, 9)}`;
    if (filterValue.length > 9) formatted += `-${filterValue.slice(9, 11)}`;
  
    return formatted;
};