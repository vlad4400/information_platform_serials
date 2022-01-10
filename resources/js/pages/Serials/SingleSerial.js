import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSerial, selectSerial } from '../../store/serial.slice';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const renderSerial = () => {
    if (loading) return <div>Loading...</div>;
    if (hasErrors) return <div>Ошибка при загрузке.</div>;
    return (
      <>
        <h2>{serial.title}</h2>
        <h2>Рейтинг сериала: {serial.rate} </h2>
        <h2>Сюжет: </h2>
        <p>{serial.description}</p>
      </>
    );
  };

  return (
    <div>
      <h2>Страница сериала</h2>
      <p>Здесь будет описание сериала, ID: {serialId}</p>
      {renderSerial()}
    </div>
  );
};
