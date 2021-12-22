## Информационная платформа о сериалах
Командный проект по курсу Geekbrains.\
Краткое описание: \
Сайт для быстрого нахождения интересного сериала (рейтинг топ 50 сериалов, на основании оценок пользователей). \ 
И место где можно посмотреть даты выхода новых серий, и отметить уже просмотренные сериалы, серии.

### Built With

* [React.js](https://reactjs.org/)
* [Laravel](https://laravel.com)
* [Bootstrap](https://getbootstrap.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

* PHP
* Composer
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. `git clone https://github.com/vlad4400/information_platform_serials.git`
2. `create a .env file copy content from .env.example and update the values`
3. `composer install && composer update`
4. `php artisan cron:refresh-database`
5. if npm version < 7 `npm install && npm run dev` else `npm install --legacy-peer-deps && npm run dev`
6. `php artisan key:gen`
7. `php artisan serve`

<p align="right">(<a href="#top">back to top</a>)</p>
