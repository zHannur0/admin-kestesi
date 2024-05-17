import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setText?: Dispatch<SetStateAction<string>>;
  setId?: any;
  setShowActive?: Dispatch<SetStateAction<boolean>>;
  timeArr: ITimeArr[];
}

interface ITimeArr {
  id: number;
  type: string;
}

const ClassNamesModal: FC<IProps> = ({
  setText,
  setShowActive,
  timeArr,
  setId,
}) => {
  const handleGetTime = (id?: number, text?: string) => {
    if (setText && setShowActive && setId) {
      setText(text as string);
      setShowActive(false);

      setId(id as number);
    }
  };

  return (
    <>
      {timeArr &&
        timeArr.map((item) => (
          <div
            className="main_table-modal-active"
            key={item.id}
            onClick={() => handleGetTime(item.id, item.type)}
          >
            {item.type}
          </div>
        ))}
    </>
  );
};

export default ClassNamesModal;
