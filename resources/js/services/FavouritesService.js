import authAxios from './authAxios';

export const updateFavouriteStatus = ({id, status}) => {
    return authAxios.put(`/favorites/${id}/status/${status}`);
}
