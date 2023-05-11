// План
// 1. Реализовать форму логина в приложении(+)
//  * Перенести всю разметку в рендер функцию(+)
// * Сделать форму входа динамической(+)
//  * Oтрефакторить приложение на модули
//  * API (+)
//   Вытащить логин компонент в отдельный модуль(+)
//   Вытащить компонент списка задач и форму добавления в отдельный модуль
// 2. Реализовать форму регистрации(+)

import { addTodo, deleteTodo, getTodos } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js"
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
import { format } from "date-fns"

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");


let tasks = [];

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;



const fetchTodosAndRender = () => {
    return getTodos({ token })                    //из api.js
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

const renderApp = () => {
    const appElement = document.getElementById("app");
    if (!token) {    //отрендерить форму входа /если у нас нет token - только форма входа
        renderLoginComponent({
            appElement,
            setToken: (newToken) => {
                token = newToken
            },
            fetchTodosAndRender,
        });

        return;
    }
    // const country = "ru"; //переменную country, в которой будем хранить ru или us и в зависимости от этого показывать нужный формат даты

    const tasksHtml = tasks
        .map((task) => {
            const createDate = format(new Date(task.created_at), 'dd/MM/yyyy hh:mm');
            const now = new Date();
            format(now, "MM-dd-yyyy hh:mm")
            return `
                    <li class="task">
                        <p class="task-text">
                            ${task.text} (Создал: ${task.user?.name ?? "Неизвестно"} )
                            <button data-id="${task.id}" class="button delete-button">Удалить</button>
                        </p>
                               <p><i>Задача создана: ${createDate}</i></p>
          </li > `;
        })
        .join("");
    //убираем форму входа из appHtml:
    const appHtml = ` 
                <h1>Список задач</h1>  

                <ul class="tasks" id="list">
                    <!—- Список рендерится из JS -—>
                    ${tasksHtml}
                </ul>
                <br />
                <div class="form">
                    <h3 class="form-title">Форма добавления</h3>
                    <div class="form-row">
                        Что нужно сделать:
                        <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
                    </div>
                    <br />
                    <button class="button" id="add-button">Добавить</button>
                </div>`



    appElement.innerHTML = appHtml; //рендерим приложение 

    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");


    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            // Подписываемся на успешное завершение запроса с помощью then
            deleteTodo({

                id, token
            }).then((responseData) => {
                // Получили данные и рендерим их в приложении
                tasks = responseData.todos;
                renderApp();
            });

            renderApp();
        });
    }

    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляется...";
        addTodo({
            text: textInputElement.value,
            token
        })
            .then(() => {
                // TODO: кинуть исключение
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.error(error);
                alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });

        renderApp();
    });
};

//fetchTodosAndRender();//не можем делать сначала запрос так как нет еще авторизации
// поэтому сначала renderApp()
renderApp();

