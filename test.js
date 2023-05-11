const tasksHtml = tasks
    .map((task) => {
        return `
        <li class="task">
           <p class="task-text">
            ${task.text} (Создал: ${task.user?.name ?? "Неизвестно"})
             <button data-id="${task.id}" class="button delete-button">Удалить </button>
           </p>
					 <p> <i>Задача создана: ${formatDate(new Date(task.created_at))} </i> </p>
         </li>`;
    })
    .join("");

// Функция formatDate будет принимать на вход дату и преобразовывать ее к виду
// ДД/ММ/ГГГГ ЧЧ:ММ, если число меньше 10, то перед числом ставим 0.
// Сама функция реализована довольно просто, мы возвращаем строку, где для
// дня, месяца, года, часа и минуты вызываем соответствующие методы встроенного
// объекта Date, при этом с помощью тернарного оператора проверяем получаемое число
// для дня, месяца, часа и минуты, если число меньше 10, то перед числом ставим 0
const formatDate = (date) => {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}
//${new Date(task.created_at)} было 
//${formatDate(new Date(task.created_at))} стало