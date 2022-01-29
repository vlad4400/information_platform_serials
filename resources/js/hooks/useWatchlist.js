import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredWatchlist,
  selectWatchlistById,
  addToWatchlist,
  removeFromWatchlist,
  setRating,
  setStatus,
} from '../store/watchlist.slice';

export const useWatchlist = (serialId) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectFilteredWatchlist);
  const watchlistItem = useSelector((state) =>
    selectWatchlistById(state, serialId)
  );

  return {
    watchlist,
    watchlistItem,
    setRating: (payload) => dispatch(setRating(payload)),
    setStatus: (payload) => dispatch(setStatus(payload)),
    addToWatchlist: (payload) => dispatch(addToWatchlist(payload)),
    removeFromWatchlist: (payload) => dispatch(removeFromWatchlist(payload)),
  };
};
