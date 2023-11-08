# base-mongo-api

    Инициализация:
    1. Скопируйте содержимое репозиторий на свою локальную машину
    2. Установите зависимости командой npm install
    3. Укажите данные своего подключения к базе в файле .env
    4. (Опционально) Выполните миграцию
    5. Запустите сервер командой node index.js
    6. Установите и запустите фронт
    7. ...
    8. Profit!

    создать миграцию npx knex --esm migrate:make init --migrations-directory migrations
    выполнить миграцию npx knex --esm migrate:latest --knexfile knexfile.js --migrations-directory migrations
