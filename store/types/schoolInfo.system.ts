import {
  IClass,
  IClassRoom,
  IKruzhok,
  IMenu,
  ISchoolInfo as ISchool,
  ISchoolAdmin,
  ISchoolPassport,
  ISchoolPhotos,
  ISchoolSocialMedia,
  IUsers, ISchoolDirector, INotification, IMap, ISlider,
} from "@/types/assets.type";

export interface ISchoolInfo {
  kruzhok?: IKruzhok[];
  kruzhokid?: IKruzhok;
  teachers?: any[];
  menu?: IMenu[];
  menuid?: IMenu;
  classroom?: IClassRoom[];
  classroomid?: IClassRoom;
  school?: ISchool[];
  schoolid?: ISchool;
  users?: IUsers[];
  schooladmin?: ISchoolAdmin[];
  schooladminid?: ISchoolAdmin;
  schoolphotos?: ISchoolPhotos[];
  schoolphotosid?: ISchoolPhotos;
  schoolpassport?: ISchoolPassport[];
  schoolsocial?: ISchoolSocialMedia[];
  schoolsocialid?: ISchoolSocialMedia;
  schooldirectorid?: ISchoolDirector;
  schooldirector?: ISchoolDirector[];
  class?: IClass[];
  classid?: IClass;
  notifications?: INotification[];
  notificationId?: INotification;
  maps?: IMap[];
  map?: IMap;
  slider: ISlider[];
}

export const initaialStateSchoolInfo: ISchoolInfo = {
  kruzhok: [],
  menu: [],
  classroom: [],
  school: [],
  users: [],
  schooladmin: [],
  schoolpassport: [],
  schoolphotos: [],
  schoolsocial: [],
  teachers: [],
  schoolid: {},
  classroomid: {},
  menuid: {},
  schoolsocialid: {},
  kruzhokid: {},
  schooladminid: {},
  class: [],
  classid: {},
  schooldirector:[],
  schooldirectorid: {},
  notifications:[],
  notificationId:{},
  maps: [],
  map: {},
  slider: [],
};
