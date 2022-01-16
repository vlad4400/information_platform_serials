export function CheckInputSignUp({ data }) {

    let errorMessage = "";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {

        errorMessage += 'Неверный адрес. '
    } else
        if (!data.email) { errorMessage += "Почтовый адрес не может быть пустым. " };
    if (data.name.trim === "") { errorMessage += "Имя должно быть заполнено. " };
    if (!data.password) { errorMessage += "Пароль не может быть пустым. " };
    if (!data.passwordConfirmation) { errorMessage += "Заполните подтверждение пароля. " };
    if (data.password !== data.passwordConfirmation) { errorMessage += "Пароль и подтверждение пароля не совпадают. " };

    return errorMessage;
}