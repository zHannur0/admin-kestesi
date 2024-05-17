import {FC} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {instance} from "@/api/axios.instance";
import {getTokenInLocalStorage} from "@/utils/assets.utils";
import {getClassRoomThunk} from "@/store/thunks/schoolnfo.thunk";
import {Table, Td, Th, Thead, Tr} from "@/components/atoms/UI/Tables/Table";
import {DeleteIcons, PenIcons} from "@/components/atoms/Icons";

interface IProps {
    autoDistribution?: any;
    handleClickGetId?: (id?: number) => void;
}

const ScheduleTable1: FC<IProps> = ({ autoDistribution, handleClickGetId }) => {
    const dispatch = useAppDispatch();
    const handleDeleteItems = async (id?: number) => {

    };
    return (
        <div className="main_table">
            <div className="main_table-block">
                <Table>
                    <Thead>
                        <tr>
                            <Th>№</Th>
                            <Th>Преподаватель</Th>
                            <Th>Предмет</Th>
                            <Th>Класс</Th>
                            <Th>Количество уроков</Th>
                            <Th>Подгруппа</Th>
                            <Th>Действие</Th>
                        </tr>
                    </Thead>
                    {/*{autoDistribution &&*/}
                    {/*    autoDistribution.map((item, index) => (*/}
                    {/*        <Tr key={item.id}>*/}
                    {/*            <Td>{index + 1}</Td>*/}
                    {/*            <Td>{item.classroom_name}</Td>*/}
                    {/*            <Td>{item.classroom_number}</Td>*/}
                    {/*            <Td>{item.flat}</Td>*/}
                    {/*            <Td>{item.korpus}</Td>*/}
                    {/*            <Td>*/}
                    {/*                <div*/}
                    {/*                    onClick={() =>*/}
                    {/*                        handleClickGetId && handleClickGetId(item.id)*/}
                    {/*                    }*/}
                    {/*                >*/}
                    {/*                    <PenIcons />*/}
                    {/*                </div>*/}

                    {/*                <div onClick={() => handleDeleteItems(item.id)}>*/}
                    {/*                    <DeleteIcons />*/}
                    {/*                </div>*/}
                    {/*            </Td>*/}
                    {/*        </Tr>*/}
                    {/*    ))}*/}
                </Table>
            </div>
        </div>
    );
};

export default ScheduleTable1;


