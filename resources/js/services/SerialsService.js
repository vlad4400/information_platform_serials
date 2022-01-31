import authAxios from './authAxios';

export const switchFavorite = (id) => {
    return authAxios.put(`/favorites/${id}`);
}

export const getSerialsByRate = (first, pageNumber, sortOrder = 'ASC') => {
    // return authAxios.get(`/serials`); //for tests
    return authAxios.get(`/search/rate/${first}/${pageNumber}/${sortOrder == 'ASC' ? '0' : '1'}`);
}

export const getSerialsByYear = (first, pageNumber) => {
    return authAxios.get(`/search/year/${first}/${pageNumber}`);
}

export const getSerialsByRateTop50Asc = () => {
    return authAxios.get(`/search/rate/1/50/0`);
}

export const getSerialsByRateTop50Desc = () => {
    return authAxios.get(`/search/rate/1/50/1`);
}

export const getSerialsByYearTop50Asc = () => {
    return authAxios.get(`/search/year/1/50/0`);
}

export const getSerialsByYearTop50Desc = () => {
    return authAxios.get(`/search/year/1/50/1`);
}
