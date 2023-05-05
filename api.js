const host = "https://webdev-hw-api.vercel.app/api/v2/todos"; //выносим в переменную адрес API

export function getTodos({token}){
   return  fetch(host, {
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

export function deleteTodo ({
    token,
    id
}){
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

export function addTodo({text, token}) {
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