import authAxios from './authAxios';

export const switchFavorite = (id) => {
    return authAxios.put(`/favorites/${id}`);
}

export const getSerialsByRateTop50Asc = () => {
    return authAxios.get(`/search/rate/0/50/1`);
}

export const getSerialsByRateTop50Desc = () => {
    return authAxios.get(`/search/rate/10/50/0`);
}

export const getSerialsByYearTop50Asc = () => {
    return authAxios.get(`/search/year/0/50/1`);
}

export const getSerialsByYearTop50Desc = () => {
    return authAxios.get(`/search/year/2030/50/0`);
}
