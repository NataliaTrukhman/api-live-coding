import { loginUser } from "../api.js";

export function renderLoginComponent({ appElement, setToken, fetchTodosAndRender }) {   //рендерим форму входа
    const appHtml = ` 
                <h1>Список задач</h1>

                <div class="form">
                    <h3 class="form-title">Форма входа</h3>
                    <div class="form-row">
                        Логин:
                        <input type="text" id="login-input" class="input"/>
                        <br/>
                        Пароль:
                        <input type="password" id="password-input" class="input"/>
                    </div>
                    <br/>
                    <button class="button" id="login-button">Войти</button>
                </div>`;

    appElement.innerHTML = appHtml; //рендерим приложение 

    document.getElementById("login-button").addEventListener('click', () => {
        const login = document.getElementById("login-input").value; //достаем значение
        const password = document.getElementById("password-input").value;
        //валидация 
        if (!login) {
            alert("Введите логин!")
            return;
        }
        if (!password) {
            alert("Введите пароль!")
            return;
        }
        loginUser({
            login: login,
            password: password,
        }).then((user) => {
            setToken(`Bearer ${user.user.token}`); //
            fetchTodosAndRender();
        }).catch(error=>{
            //ToDo выводить alert красиво
            alert(error.message)
        })

        //перендерим приложение чтобы отрендерился список/ запрашиваем данные через fetch
    });
}