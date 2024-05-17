import {
  ICalls,
  IClassName,
  IExtraLessons,
  ILessons,
  INews,
  ISchoolAltyn,
  ISchoolAtest,
  ISchoolOlimp,
  ISchoolOner, ISchoolPride,
  ISchoolSport,
  ITeachers,
} from "@/types/assets.type";

export interface IPrideInfo {
  sport?: ISchoolSport[];
  olimp?: ISchoolOlimp[];
  atest?: ISchoolAtest[];
  altyn?: ISchoolAltyn[];
  oner?: ISchoolOner[];
  sportid?: ISchoolSport;
  olimpid?: ISchoolOlimp;
  atestid?: ISchoolAtest;
  altynid?: ISchoolAltyn;
  onerid?: ISchoolOner;
  lessons?: any[];
  lessonsid?: ILessons;
  extra?: IExtraLessons[];
  extraid?: IExtraLessons;
  dop?: ICalls[];
  dopid?: ICalls;
  os?: ICalls[];
  osid?: ICalls;
  classname?: IClassName[];
  teachers?: ITeachers[];
  news?: INews[];
  newsid?: INews;
  pride?: ISchoolPride[];
  prideId?: ISchoolPride;
}

export const initaialStatePrideInfo: IPrideInfo = {
  olimp: [],
  sport: [],
  atest: [],
  altyn: [],
  oner: [],
  lessons: [],
  extra: [],
  dop: [],
  os: [],
  classname: [],
  teachers: [],
  news: [],
  extraid: {},
  lessonsid: {},
  dopid: {},
  osid: {},
  newsid: {},
  sportid: {},
  olimpid: {},
  atestid: {},
  altynid: {},
  onerid: {},
  pride:[],
  prideId:{},
};
