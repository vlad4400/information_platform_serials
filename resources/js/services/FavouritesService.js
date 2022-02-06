import authAxios from './authAxios';

export const updateFavouriteStatus = ({id, status}) => {
    return authAxios.put(`/favorites/${id}/status/${status}`);
}

export const updateFavouriteRating = ({id, rating}) => {
    return authAxios.put(`/favorites/${id}/eval/${rating}`);
}
