const host = "https://webdev-hw-api.vercel.app/api/v2/todos"; //выносим в переменную адрес API

export function getTodos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            // обработать 401 код ответа 
            if (response.status === 401) {
                //     password = prompt("Ввести верный пароль");
                //     fetchTodosAndRender();  //вызвать рендер чтобы повторно запросить данные с сервера
                throw new Error("Нет авторизации");//кинуть ошибку
            }
            return response.json();
        });
}

export function deleteTodo({
    token,
    id
}) {
    return fetch(`${host}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        });
}

export function addTodo({ text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
}
//адрес: https://webdev-hw-api.vercel.app/api/user/login  //запрос на логин

export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if(response.status === 400){
            throw new Error ("Неверный логин или пароль")
        }
        return response.json(); //отсюда данные user в login-component 
    })
}

export function registerUser({ login, password, name }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь существует")
        }
        return response.json(); //отсюда данные user в login-component 
    })
}