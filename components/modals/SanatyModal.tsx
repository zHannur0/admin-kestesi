import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setText?: Dispatch<SetStateAction<string>>;
  setShowActive?: Dispatch<SetStateAction<boolean>>;
  setId?: Dispatch<SetStateAction<number | undefined>>;
  timeArr: ITimeArr[] | any[];
}

interface ITimeArr {
  id: number;
  type: string;
}

const SanatyModalModal: FC<IProps> = ({
  setText,
  setShowActive,
  timeArr,
  setId,
}) => {
  const handleGetTime = (text: string, id?: number) => {
    if (setText && setShowActive && setId) {
      setText(text);
      setShowActive(false);

      setId(id as number);
    }
  };

  return (
    <>
      {timeArr &&
        timeArr.map((item) => (
          <div
            className="sanaty_block"
            key={item.id}
            onClick={() => handleGetTime(item.type, item.id)}
          >
            {item.type}
          </div>
        ))}
    </>
  );
};

export default SanatyModalModal;
