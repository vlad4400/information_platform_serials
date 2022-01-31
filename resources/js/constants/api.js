//константы

const prefixPAth = '';
export const API_ADMIN_USERS = prefixPAth + '/api/admin/users';  //все пользователи
export const API_SERIALS = prefixPAth + '/api/serials';      //все сериалы

// /api/serials/{id}-сериал с id={id}
export const API_ADMIN_SERIALS = prefixPAth + '/admin/serials';    //все сериалы для админа(resourse)
// /api/admin/serials/{id}-сериал с id={id} для админа(для изменения, добавления и удаления)
export const API_ADMIN_PARSER = prefixPAth + '/admin/parser';     //для админа(парсит сериалы)

export const API_REG_COOKIE = '/sanctum/csrf-cookie';

export const API_REGISTER = '/api/register';
export const API_FAVORITES = '/api/favorites';

