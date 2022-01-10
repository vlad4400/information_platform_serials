export function CheckInputSignUp(email, name, password, passwordConfirmation) {
    let errorMessage = "";
    if (!email) { errorMessage += "Почтовый адрес не может быть пустым. " };
    if (!name) { errorMessage += "Имя должно быть заполнено. " };
    if (!password) { errorMessage += "Пароль не может быть пустым. " };
    if (!passwordConfirmation) { errorMessage += "Заполните подтверждение пароля. " };
    if (password !== passwordConfirmation) { errorMessage += "Пароль и подтверждение пароля не совпадают. " };

    return errorMessage;
}