import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setText?: Dispatch<SetStateAction<string>>;
  setShowActive?: Dispatch<SetStateAction<boolean>>;
}

const TimeModal: FC<IProps> = ({ setText, setShowActive }) => {
  const handleGetTime = (text: string) => {
    if (setText && setShowActive) {
      setText(text);
      setShowActive(false);
    }
  };

  return (
    <>
      {timeArr.map((item) => (
        <div
          className="main_table-modal-active"
          key={item.id}
          onClick={() => handleGetTime(item.time)}
        >
          {item.time}
        </div>
      ))}
    </>
  );
};

const timeArr = [
  {
    id: 1,
    time: "Понедельник",
  },

  {
    id: 2,
    time: "Вторник",
  },

  {
    id: 3,
    time: "Среда",
  },

  {
    id: 4,
    time: "Четверг",
  },

  {
    id: 5,
    time: "Пятница",
  },

  {
    id: 6,
    time: "Суббота",
  },
];

export default TimeModal;
