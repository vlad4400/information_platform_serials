import { useParams } from 'react-router-dom';

export const SingleSerial = ({ serials }) => {
  const { serialId } = useParams();
  const serial = serials.find((serial) => serial.id == serialId);
  return (
    <div>
      <h2>Страница сериала</h2>
      <p>Здесь будет описание сериала, ID: {serialId}</p>
      <h2>{serial.title}</h2>
      <h2>Рейтинг сериала: {serial.rating} </h2>
    </div>
  );
};
