import authAxios from './authAxios';

export const switchFavorite = (id) => {
    return authAxios.put(`/favorites/${id}`);
}

export const getSerialsByRate = (rate, pageNumber, sortOrder = 'ASC') => {
    //return authAxios.get(`/serials`); //for tests
    return authAxios.get(`/search/rate/${rate}/${pageNumber}/${sortOrder == 'ASC' ? '1' : '0'}`);
}

export const getSerialsByYear = (year, pageNumber) => {
    return authAxios.get(`/search/year/${year}/${pageNumber}`);
}

export const getSerialsByRateTop50Asc = () => {
    return authAxios.get(`/search/rate/10/50/0`);
}

export const getSerialsByRateTop50Desc = () => {
    return authAxios.get(`/search/rate/1/50/1`);
}

export const getSerialsByYearTop50Asc = () => {
    return authAxios.get(`/search/year/1900/50/1`);
}

export const getSerialsByYearTop50Desc = () => {
    return authAxios.get(`/search/year/2022/50/0`);
}
