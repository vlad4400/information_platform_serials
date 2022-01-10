import axios from 'axios';

export default axios.create({
  baseURL: 'https://boiling-anchorage-83800.herokuapp.com/api',
});

// export const API_ADMIN_USERS = prefixPAth + '/api/admin/users';  //все пользователи
// export const API_SERIALS = prefixPAth + '/api/serials';      //все сериалы
// // /api/serials/{id}-сериал с id={id}
// export const API_ADMIN_SERIALS = prefixPAth + '/api/admin/serials';    //все сериалы для админа(resourse)
// // /api/admin/serials/{id}-сериал с id={id} для админа(для изменения, добавления и удаления)
// export const API_ADMIN_PARSER = prefixPAth + '/api/admin/parser';     //для админа(парсит сериалы)
