import Link from "next/link";
import { useRouter } from "next/router";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useEffect, useState } from "react";
import { instance } from "@/api/axios.instance";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {getUserIdThunk} from "@/store/thunks/available.thunk";

const Sidebar = () => {
  const router = useRouter();


  return (
    <div className="sidebar">
      <Link href={"/main"}>
        <div className="sidebar_top">KESTESI.KZ</div>
      </Link>

      <nav className="sidebar_links">
        {sidebar.map((item) => (
          <Link
            href={`/${item.link}`}
            key={item.id}
            className={`${
              router.asPath.split("/")[1] === item.link?.split("/")[0]
                ? "active"
                : ""
            }`}
          >
            <div>{router.locale === "kz" ? item.typeKz : item.type}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

interface IType {
  id?: number;
  type?: string;
  typeKz?: string;
  link?: string;
}

const sidebar: IType[] = [
  {
    id: 1,
    type: "Расписание",
    typeKz: "Сабақ кестесі",
    link: "schedule/1",
  },

  {
    id: 2,
    type: "Преподаватели",
    typeKz: "Мұғалімдер",
    link: "teachers",
  },

  {
    id: 3,
    type: "Предметы",
    typeKz: "Пәндер",
    link: "lessons",
  },

  {
    id: 4,
    type: "Гордость школы",
    typeKz: "Мектеп мақтаныштары",
    link: "prideschool",
  },

  {
    id: 5,
    type: "О школе",
    typeKz: "Мектеп жайлы",
    link: "school/1",
  },

  {
    id: 6,
    type: "Новости",
    typeKz: "Жаңалықтар",
    link: "news",
  },

  {
    id: 7,
    type: "Кабинет",
    typeKz: "Кабинет",
    link: "cabinet",
  },

  {
    id: 8,
    type: "Меню",
    typeKz: "Ас мәзірі",
    link: "menu",
  },

  {
    id: 9,
    type: "Кружок",
    typeKz: "Үйірме",
    link: "main",
  },

  {
    id: 10,
    type: "Класс",
    typeKz: "Сынып",
    link: "class",
  },

  {
    id: 11,
    type: "Тип занятий",
    typeKz: "Сабақ түрі",
    link: "typelessons",
  },

  {
    id: 12,
    type: "Звонки",
    typeKz: "Қоңырау",
    link: "calls/1",
  },

  {
    id: 13,
    type: "Уведомления",
    typeKz: "Хабарламалар",
    link: "notification",
  },
  {
    id: 14,
    type: "Карта школы",
    typeKz: "Мектеп картасы",
    link: "map",
  },
  {
    id: 15,
    type: "Фото-слайдер",
    typeKz: "Фото-слайдер",
    link: "slider"
  }
];


export default Sidebar;
