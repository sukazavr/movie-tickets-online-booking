Movie Tickets Online Booking
=========

Demo
-------------
https://movie-tickets-online-booking.firebaseapp.com/

Run in DEV mod
-------------
```
npm i
npm start
```

Technology Stack
-------------
* React
* Redux
* redux-poj (instead react-redux)
* Cycle.js (side effects)
* staltz/xstream (functional reactive stream library)
* CSS Modules

Prerequisites
-------------
1. На экране появляется кинозал - квадратики мест (10 рядов по 10 мест)
2. Свободные места - зеленые квадратики, занятые места - красные квадратики
3. Часть мест занята изначально (10 случайных квадратиков).
4. Мышкой тыкаем на нужные места (можно тыкать только на свободные) - места выделяются/развыделяются желтым.
Справа появляется статус: "Вы выбрали места: ряд 1 место 4, ряд 1 место 5..." и общая стоимость (1 билет стоит 100 руб). Ниже кнопки "Купить" и "Отмена" - после нажатия Купить - квадратики становятся красными и выдается сообщение: "Спасибо за заказ!"
