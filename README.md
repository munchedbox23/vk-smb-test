<h1 align="center">Тестовое задание ВКонтакте в команду СМБ платформы</h1>

<div align="center">
  <img width="100" height="100" src="https://s3.printskrin.ru/printskrin/413c5bf6-streamtube/2024/06/27/VK-Logo.png" alt="VK-Logo.png" border="0" />
</div>

<h2>Оглавление</h2>
<ol>
  <li><a href="#project-description">Описание проекта</a></li>
  <li><a href="#technologies">Стек технологий</a></li>
  <li><a href="#installation">Установка и запуск приложения</a></li>
  <li><a href="#functionality">Функционал</a></li>
  <li><a href="#tests">Тесты</a></li>
  <li><a href="#enhancement">Статус</a></li>
</ol>

<h2 id="project-description">1. Описание проекта</h2>
Проект VK Movies - это веб-приложение (SPA), разработанное с использованием React Js, React hooks, Redux, React Router и TypeScript. Оно позволяет пользователям просматривать и искать фильмы, фильтровать их по различным критериям и просматривать подробную информацию о каждом фильме. Приложение получает данные о фильмах из API и предоставлять пользовательский интерфейс для пользователей, чтобы они могли исследовать и управлять своими любимыми фильмами.

<h2 id="technologies">2. Используемый стек технологий</h2>
<ul>
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg"  title="Jest" alt="Jest" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/cypressio/cypressio-original.svg"  title="Cypress" alt="Cypress" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg"  title="TypeScript" alt="TypeScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/webpack/webpack-original.svg" title="Webpack" alt="Webpack" width="40" height="40"/>&nbsp;
  <img src="https://v4.mui.com/static/logo.png" title="MUI" alt="Material UI" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
</ul>

<h2 id="installation">3. Установка и запуск</h2>
 <span>Клонирование проекта</span>

- `https://github.com/munchedbox23/vk-smb-test.git` - clone project by HTTPS(HTTP + TSL)
- `npm install` - Установка зависимостей
- `npm start` - Запуск проекта на лольном сервере
- `npm run build` - Полная сборка проект
- `npm run test` - Запуск тестов
- `npm run predeploy` - Запуск сборки проекта перед деплоем
- `npm run deploy` - Запуск деплоя на GitHub Pages

<h2 id="functionality">4. Функционал</h2>

- Регистрация и авторизация пользователей, восстановление пароля
- Редактирование личных данных
- Отображение списка фильмов
- Фильтрация списка фильмов
- Просмотр детальной информации о фильме
- Поиск фильмов по названию
- Добавление фильмов в список "Избранное"

<h2 id="tests">5. Тесты</h2>
Для проверки функциональности были разработаны автотесты с использованием Jest и Cypress. Тест-раннер Jest был применен для проверки всех редьюсеров, обеспечивая покрытие логики состояния приложения. В свою очередь, Cypress использовался для интеграционного тестирования функционала, связанного с карточками фильмов. Это включало проверку отображения карточек на странице, корректности поиска, возможности добавления фильма в "Избранное" и правильности работы фильтров.

Ниже представлены скриншоты, демонстрирующие успешно пройденные тесты:

<div align="center">
 <img src="https://s3.printskrin.ru/printskrin/413c5bf6-streamtube/2024/06/30/SNIMOK-EKRANA-2024-06-30-224913.png" alt="SNIMOK-EKRANA-2024-06-30-224913.png" border="0" />
  <img src="https://s3.printskrin.ru/printskrin/413c5bf6-streamtube/2024/06/30/SNIMOK-EKRANA-2024-06-30-225050.png" alt="SNIMOK-EKRANA-2024-06-30-225050.png" border="0" />
</div>

<h2 id="enhancement">6. Дальнейшие планы</h2>

- Сделать адаптивный дизайн для разных видов устройств(не успел сделать)

<i>Проект развернуть на [Yandex Cloud](https://munvk-movie.students.nomorepartiesco.ru/)</i>
