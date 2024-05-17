import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setText?: Dispatch<SetStateAction<string>>;
  setShowActive?: Dispatch<SetStateAction<boolean>>;
  timeArr: ITimeArr[];
}

interface ITimeArr {
  id: number;
  type: string;
}

const NumberModal: FC<IProps> = ({ setText, setShowActive, timeArr }) => {
  const handleGetTime = (text: string) => {
    if (setText && setShowActive) {
      setText(text);
      setShowActive(false);
    }
  };

  return (
    <>
      {timeArr &&
        timeArr.map((item) => (
          <div
            className="main_table-modal-number"
            key={item.id}
            onClick={() => handleGetTime(item.type)}
          >
            {item.type}
          </div>
        ))}
    </>
  );
};

export default NumberModal;
