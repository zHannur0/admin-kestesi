import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import ScheduleModal from "../forms/ScheduleModal";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { IARing, ISchedule } from "@/types/assets.type";
import {getTokenInLocalStorage} from "@/utils/assets.utils";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {instance} from "@/api/axios.instance";
import axios from 'axios';
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";


interface IProps {
  selectModePaste?: boolean;
  selectMode?: boolean;
  selectedCellsPaste?: any;
  selectedCells?: any;
  handleCheckboxClick?: any;
  handleCheckboxClickPaste?: any;
  iaring?: any;
  selectedCheckboxId?: any;
  isOsnova?:boolean;
}

const ScheduleTable = ({
  selectModePaste,
  selectMode,
  selectedCellsPaste,
  selectedCells,
  handleCheckboxClick,
  iaring,
  handleCheckboxClickPaste,
                         selectedCheckboxId,
    isOsnova,
}: IProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<{
    day?: any;
    start_time?: any;
    end_time?: any;
    timeId?: any;
    day_index?: any;
  }>();
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  const schedule = isOsnova ? useTypedSelector((state) => state.ia.sch) : useTypedSelector((state) => state.ia.dopSch);
  const [classPlan, setClassPlan] = useState<any>({});
  useEffect(() => {
    const url = `https://bilimge.kz/admins/api/class/?class_name=${decodeURIComponent(
        router.asPath?.split("/")?.at(-1) as string,
    )}`
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
          },
        });

        if (response && response.data) {
          if (isOsnova) {
            setClassPlan(response.data[0]?.osnova_plan);
          } else {
            setClassPlan(response.data[0]?.dopurok_plan);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };


    fetchSchedule();
  }, [classPlan]);

  const handleCellClick = (
    day: any,
    start_time: any,
    end_time: any,
    timeId?: any,
    day_index?:any,
  ) => {
    setOpenModal(true);
    setSelectedCell({ day, start_time, end_time, timeId, day_index });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getInitials = (fullName?: string) => {
    if (!fullName) return ""; // Return empty if fullName is falsy

    const parts = fullName.split(" ");
    if (parts.length === 0) return ""; // Return empty if no parts

    // Attempt to construct the desired format
    let initials = parts[0]; // Always add the first part
    if (parts.length > 1) {
      initials += ` ${parts[1][0]}.`; // Add the first initial of the second part, if exists
    }
    if (parts.length > 2) {
      initials += ` ${parts[2][0]}.`; // Add the first initial of the third part, if exists
    }

    return initials;
  };

  const sortArr = [...(iaring.filter((entry: any) => entry.plan === classPlan) || [])].sort((a: IARing, b: IARing) => {
    const timeA = new Date(`2000-01-01 ${a.start_time}`);
    const timeB = new Date(`2000-01-01 ${b.start_time}`);

    return timeA.getTime() - timeB.getTime();
  });
  return (
      <>
        {openModal && (
            <ScheduleModal
                onReject={handleCloseModal}
                selectedCell={selectedCell}
                classnames={decodeURIComponent(
                    router.asPath.split("/").at(-1) as string,
                )}
                isOsnova={isOsnova}
            />
        )}
      <div style={{marginBottom: "5vh"}}>
        <div className="main_table-title">
          {isOsnova ?  t.schedule.mainLessons : t.schedule.additionalLessons}
        </div>
        <TableContainer
            component={Paper}
            elevation={0}
            style={{boxShadow: "none", }}
        >

          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                    style={{border: "2px solid #4090FF", textAlign: "center"}}
                >
                  <div
                      style={{
                        color: "#000000",
                        fontSize: "2rem",
                        fontWeight: "500",
                        marginBottom: "1.6rem",
                      }}
                  >
                    {t.schedule.date}
                  </div>
                  {" "}
                  <div
                      style={{
                        color: "#878787",
                        fontSize: "2rem",
                        fontWeight: "500",
                      }}
                  >
                    {t.schedule.time}
                  </div>
                </TableCell>
                {days.map((day, index) => (
                    <TableCell
                        key={index}
                        style={{
                          border: "2px solid #4090FF",
                          color: "#000000",
                          fontSize: "2rem",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                    >
                      {router.locale === "kz" ? daysKz[index] : day}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortArr.map((timeRange: any, timeIndex: any) => (
                  <TableRow key={timeIndex}>
                    <TableCell
                        style={{border: "2px solid #4090FF", textAlign: "center"}}
                    >
                      <div
                          style={{
                            color: "#000000",
                            fontSize: "2rem",
                            fontWeight: "500",
                          }}
                      >
                        {timeRange.start_time.split(":")[0]}:
                        {timeRange.start_time.split(":")[1]}
                      </div>
                      <div
                          style={{
                            color: "#878787",
                            fontSize: "2rem",
                            fontWeight: "500",
                          }}
                      >
                        {timeRange.end_time.split(":")[0]}:
                        {timeRange.end_time.split(":")[1]}
                      </div>
                    </TableCell>
                    {days.map((day, dayIndex) => {
                      const scheduleItem =
                          schedule &&
                          schedule.find(
                              (item) =>
                                  item.week_day === (dayIndex + 1).toString() &&
                                  item?.ring?.start_time === timeRange.start_time &&
                                  item?.classl?.class_name ===
                                  decodeURIComponent(
                                      router.asPath?.split("/")?.at(-1) as string,
                                  ),
                          );
                      const isSelected = selectedCells.some(
                          (selectedCell: any) =>
                              selectedCell.day === day &&
                              selectedCell.start_time === timeRange.start_time &&
                              selectedCell.end_time === timeRange.end_time,
                      );

                      const isSelectedPaste = selectedCellsPaste.some(
                          (selectedCell: any) =>
                              selectedCell.day === day &&
                              selectedCell.start_time === timeRange.start_time &&
                              selectedCell.end_time === timeRange.end_time,
                      );

                      return (
                          <TableCell
                              key={dayIndex}
                              style={{border: "2px solid #4090FF"}}
                              onClick={() => !selectMode &&
                                  handleCellClick(
                                      day,
                                      timeRange.start_time,
                                      timeRange.end_time,
                                      timeRange.id,
                                      dayIndex + 1,
                                  )
                              }
                          >
                            {scheduleItem ? (
                                <div style={{textAlign: "left"}}>
                                  <div
                                      style={{
                                        color: "#000000",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                        marginBottom: "1.8rem",
                                      }}
                                  >
                                    {scheduleItem?.subject?.full_name}
                                  </div>
                                  <div
                                      style={{
                                        color: "#116AE5",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                        marginBottom: "1.8rem",
                                      }}
                                  >
                                    {scheduleItem?.classroom?.classroom_number + "/"}  {scheduleItem?.classroom?.classroom_name} кабинет
                                  </div>
                                  <div
                                      style={{
                                        color: "#116AE5",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                      }}
                                  >
                                    {getInitials(scheduleItem?.teacher?.full_name)}
                                  </div>
                                  <div
                                      style={{
                                        color: "#000000",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                        marginBottom: "1.8rem",
                                      }}
                                  >
                                    {scheduleItem?.subject2?.full_name}
                                  </div>
                                  <div
                                      style={{
                                        color: "#116AE5",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                        marginBottom: "1.8rem",
                                      }}
                                  >
                                    {scheduleItem?.classroom2 && `${scheduleItem?.classroom2?.classroom_number} кабинет`}
                                  </div>
                                  <div
                                      style={{
                                        color: "#116AE5",
                                        fontSize: "1.7rem",
                                        fontWeight: "500",
                                      }}
                                  >
                                    {getInitials(scheduleItem?.teacher2?.full_name)}
                                  </div>

                                  {selectMode && (
                                      <Checkbox
                                          onClick={() =>
                                              handleCheckboxClick(
                                                  day,
                                                  timeRange.start_time,
                                                  timeRange.end_time,
                                                  scheduleItem?.teacher?.id,
                                                  scheduleItem?.ring?.id,
                                                  scheduleItem?.classl?.id,
                                                  scheduleItem?.subject?.id,
                                                  scheduleItem?.classroom?.id,
                                                  scheduleItem?.typez?.id,
                                                  scheduleItem?.id,
                                                  scheduleItem?.teacher2?.id,
                                                  scheduleItem?.subject2?.id,
                                                  scheduleItem?.classroom2?.id,
                                              )
                                          }
                                      />
                                  )}
                                </div>
                            ) : (
                                <>
                                  <div
                                      style={{
                                        color: "#000000",
                                        fontSize: "2rem",
                                        fontWeight: "500",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                          handleCellClick(
                                              day,
                                              timeRange.start_time,
                                              timeRange.end_time,
                                              timeRange.id,
                                          )
                                      }
                                  >
                                    +
                                  </div>

                                  {selectModePaste && (
                                      <Checkbox
                                          onClick={() =>
                                              handleCheckboxClickPaste(
                                                  day,
                                                  timeRange.start_time,
                                                  timeRange.end_time,
                                                  timeRange.id,
                                              )
                                          }
                                      />
                                  )}
                                </>
                            )}
                          </TableCell>
                      );
                    })}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </>
  );
};

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const daysKz = [
    "Дүйсенбі",
    "Сейсенбі",
  "Сәрсенбі",
  "Бейсенбі",
  "Жұма",
  "Сенбі",
]

export default ScheduleTable;
