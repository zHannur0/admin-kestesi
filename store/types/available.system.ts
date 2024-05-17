import {
  IAClass,
  IAClassRooms, IADopRing,
  IARing,
  IASchool,
  IASubjet,
  IATypeZ, IDopSchedule,
  ISchedule,
  ITeachers,
  IUsers,
} from "@/types/assets.type";

export interface ISchoolInfo {
  iaclass?: IAClass[];
  iaclassrooms?: IAClassRooms[];
  iaring?: IARing[];
  iaDopRing?: IADopRing[];
  iaschool?: IASchool[];
  iasubject?: IASubjet[];
  iatypez?: IATypeZ[];
  userid?: IUsers;
  teachersid?: ITeachers;
  sch?: ISchedule[];
  dopSch?: IDopSchedule[];
}

export const initaialStateIA: ISchoolInfo = {
  iaclass: [],
  iaclassrooms: [],
  iaring: [],
  iaschool: [],
  iasubject: [],
  iatypez: [],
  userid: {},
  teachersid: {},
  sch: [],
  dopSch: [],
  iaDopRing:[],
};
