# Установка и развертывание

## 1. Установка зависимостей

Убедитесь, что на вашем компьютере установлены Node.js и npm. Если нет, скачайте и установите их с [официального сайта](https://nodejs.org/).

1. Клонируйте репозиторий проекта:
    ```bash
    git clone <ваш-репозиторий>
    cd <папка-проекта>
    ```
2. Установите зависимости:
    ```bash
    npm install
    ```
## 2. Запуск серверов
Проект состоит из нескольких компонентов: клиентского приложения, административного интерфейса и WebSocket сервера. Каждый из них нужно запустить отдельно.
### WebSocket сервер
1. Запустите сервер:
    ```bash
    node wsserver.js
    ```
2. Сервер будет доступен по адресу: ws://localhost:9000.
### Административный сервер
1. Перейдите в папку admin:
    ```bash
    cd admin
    ```
2. Запустите сервер:
    ```bash
    node server.js
    ```
3. Сервер будет доступен по адресу: http://localhost:3000.
### Пользовательский сервер
1. Перейдите в папку user:
    ```bash
    cd ../user
    ```
2. Запустите сервер:
    ```bash
    node userserver.js
    ```
3. Сервер будет доступен по адресу: http://localhost:8080.
## 3. Использование
- Пользовательский интерфейс: Откройте браузер и перейдите по адресу http://localhost:8080. Здесь вы можете просматривать товары, фильтровать их по категориям и общаться в чате поддержки.

- Административный интерфейс: Перейдите по адресу http://localhost:3000. Здесь вы можете добавлять, редактировать и удалять товары, а также общаться в чате поддержки.

# Спецификация API
## Базовый URL
- Пользовательский сервер: http://localhost:8080

- Административный сервер: http://localhost:3000

- WebSocket сервер: ws://localhost:9000
## GraphQL API (Пользовательский интерфейс):
### 1. Получить список товаров
- Метод: POST
- URL: http://localhost:8080
####  Пример запроса:
```bash
query {
  products {
    name
    price
    description
    category
  }
}
```
#### Ответ:
```bash
{
  "data": {
    "products": [
      {
        "name": "Ананас",
        "price": 2000,
        "description": "Очень вкусный",
        "category": ["Фрукты"]
      },
      {
        "name": "Молоко",
        "price": 100,
        "description": "Вкусное молоко",
        "category": ["Молочка", "Напиток"]
      }
    ]
  }
}
```
### 2. Получить только названия и цены товаров
- Метод: POST
- URL: http://localhost:8080
####  Пример запроса:
```bash
query {
  products {
    name
    price
  }
}
```
#### Ответ:
```bash
{
  "data": {
    "products": [
      {
        "name": "Ананас",
        "price": 2000
      },
      {
        "name": "Молоко",
        "price": 100
      }
    ]
  }
}
```
## RESTful API:
### 1. Получить список товаров
- Метод: GET
- URL: /products
####  Пример запроса:
- GET /products?category=Фрукты
#### Параметры:
- **category (опционально)**: Фильтр по категории.

####  Пример запроса:
- GET /products?category=Фрукты
#### Ответ:
    [
        {
            "name": "Ананас",
            "price": 2000,
            "description": "Очень вкусный",
            "category": ["Фрукты"],
            "id": 1
        }
    ]
### 2. Добавить товар
- Метод: POST
- URL: /products

#### Тело запроса:
    {
        "name": "Новый товар",
        "price": 100,
        "description": "Описание товара",
        "category": ["Категория1", "Категория2"]
    }

#### Ответ:
    {
        "name": "Новый товар",
        "price": 100,
        "description": "Описание товара",
        "category": ["Категория1", "Категория2"],
        "id": 6
    }
### 3. Редактировать товар
- Метод: PUT
- URL: /products/:id
#### Параметры:
- id: ID товара.

#### Тело запроса:
    {
        "name": "Обновленный товар",
        "price": 150,
        "description": "Новое описание",
        "category": ["Новая категория"]
    }

#### Ответ:
    {
        "name": "Обновленный товар",
        "price": 150,
        "description": "Новое описание",
        "category": ["Новая категория"],
        "id": 1
    }
### 4. Удалить товар
- Метод: DELETE
- URL: /products/:id
#### Параметры:
- id: ID товара.

#### Ответ:
    Код ответа: 204 No Content

## WebSocket API (Чат поддержки)
### 1.  Отправка сообщения
- Метод: WebSocket
- URL: ws://localhost:9000
#### Пример отправки сообщения:
```bash
{
  "message": "Привет, у меня вопрос по товару."
}
```
#### Пример получения сообщения:
```bash
{
  "message": "Привет, у меня вопрос по товару."
}
```
### 2.  Получение сообщений
- Все сообщения, отправленные через WebSocket, будут транслироваться всем подключенным клиентам в реальном времени.
## Описание задания

### Доработка клиентской части с использованием GraphQL:

- Реализована возможность запрашивать только необходимые поля товаров (например, только названия и цены, или названия и описания).

- GraphQL запросы обрабатываются на стороне сервера и возвращают данные в соответствии с запросом.

### Реализация WebSocket API для чата поддержки:

- Чат поддерживает общение между пользователями и администраторами.

- Все сообщения транслируются в реальном времени через WebSocket сервер.

- Чат интегрирован как в пользовательский, так и в административный интерфейс.