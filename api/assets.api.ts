import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { instance } from "./axios.instance";
import {
  IKruzhok,
  IMenu,
  ICalls,
  IAClass,
  IAClassRooms,
  IARing,
  IASchool,
  IASubjet,
  ISchedule,
  IATypeZ,
  IClassRoom,
  IClass,
  INews,
  ITeachers,
  ISchoolInfo,
  IClassName,
  IUsers,
  ISchoolAdmin,
  ISchoolPassport,
  ISchoolPhotos,
  ISchoolSocialMedia,
  ISchoolSport,
  ISchoolAltyn,
  ISchoolAtest,
  ISchoolOlimp,
  ISchoolOner,
  ILessons,
  INotification,
  IExtraLessons, IADopRing, IDopSchedule, IMap, ISlider, ISchoolPride,
} from "@/types/assets.type";

export const assetsApi = {
  async getKruzhok(): Promise<IKruzhok[]> {
    return await instance.get("https://bilimge.kz/admins/api/kruzhok/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSlassInfoId(id?: number): Promise<IClass> {
    return await instance.get(`https://bilimge.kz/admins/api/class/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSlassInfo(): Promise<IClass[]> {
    return await instance.get(`https://bilimge.kz/admins/api/class/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getKruzhokId(id?: number): Promise<IKruzhok> {
    return await instance.get(`https://bilimge.kz/admins/api/kruzhok/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getKruzhokTeacher(): Promise<any[]> {
    return await instance.get("https://bilimge.kz/admins/api/available_teachers/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getMenu(): Promise<IMenu[]> {
    return await instance.get("https://www.bilimge.kz/admins/api/menu/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getMenuId(id?: number): Promise<IMenu> {
    return await instance.get(`https://www.bilimge.kz/admins/api/menu/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getClassRoom(): Promise<IClassRoom[]> {
    return await instance.get("https://www.bilimge.kz/admins/api/classroom/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getClassRoomId(id?: number): Promise<IClassRoom> {
    return await instance.get(
      `https://www.bilimge.kz/admins/api/classroom/${id}`,
      {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      },
    );
  },

  async getSchool(): Promise<ISchoolInfo[]> {
    return await instance.get(`https://www.bilimge.kz/admins/api/school/ `, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolById(id?: string): Promise<ISchoolInfo> {
    return await instance.get(
      `https://www.bilimge.kz/admins/api/school/${id ? id : ""}`,
      {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      },
    );
  },

  async getUsers(): Promise<IUsers[]> {
    return await instance.get("https://www.bilimge.kz/admins/api/users/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getUsersId(id?: number): Promise<IUsers> {
    return await instance.get(`https://www.bilimge.kz/admins/api/users/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAdministration(): Promise<ISchoolAdmin[]> {
    return await instance.get("https://bilimge.kz/admins/api/school_administration/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolDirector(): Promise<ISchoolAdmin[]> {
    return await instance.get("https://bilimge.kz/admins/api/school_director/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAdministrationId(id?: number): Promise<ISchoolAdmin> {
    return await instance.get(`https://bilimge.kz/admins/api/school_administration/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolPassport(): Promise<ISchoolPassport[]> {
    return await instance.get("https://bilimge.kz/admins/api/schoolpasport/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolPhotos(): Promise<ISchoolPhotos[]> {
    return await instance.get("https://bilimge.kz/admins/api/slider/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolPhotosId(id?: number): Promise<ISchoolPhotos> {
    return await instance.get(`https://bilimge.kz/admins/api/slider/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolSocialMedia(): Promise<ISchoolSocialMedia[]> {
    return await instance.get("https://bilimge.kz/admins/api/School_SocialMediaApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolSocialMediaId(id?: number): Promise<ISchoolSocialMedia> {
    return await instance.get(`https://bilimge.kz/admins/api/School_SocialMediaApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  // pride school

  async getSchoolSport(): Promise<ISchoolSport[]> {
    return await instance.get("https://bilimge.kz/admins/api/Sport_SuccessApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolSportId(id?: number): Promise<ISchoolSport> {
    return await instance.get(`https://bilimge.kz/admins/api/Sport_SuccessApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolOner(): Promise<ISchoolOner[]> {
    return await instance.get("https://bilimge.kz/admins/api/Oner_SuccessApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolOnerId(id?: number): Promise<ISchoolOner> {
    return await instance.get(`https://bilimge.kz/admins/api/Oner_SuccessApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getPride(): Promise<ISchoolPride[]> {
    return await instance.get(`https://bilimge.kz/admins/api/proudofschool/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getPrideId(id?: number): Promise<ISchoolPride> {
    return await instance.get(`https://bilimge.kz/admins/api/proudofschool/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolOlimp(): Promise<ISchoolOlimp[]> {
    return await instance.get("https://bilimge.kz/admins/api/PandikOlimpiadaApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolOlimpId(id?: number): Promise<ISchoolOlimp> {
    return await instance.get(`https://bilimge.kz/admins/api/PandikOlimpiadaApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAltyn(): Promise<ISchoolAltyn[]> {
    return await instance.get("https://bilimge.kz/admins/api/School_AltynBelgiApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAltynId(id?: number): Promise<ISchoolAltyn> {
    return await instance.get(`https://bilimge.kz/admins/api/School_AltynBelgiApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAtestat(): Promise<ISchoolAtest[]> {
    return await instance.get("https://bilimge.kz/admins/api/School_RedCertificateApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchoolAtestatId(id?: number): Promise<ISchoolAtest> {
    return await instance.get(`https://bilimge.kz/admins/api/School_RedCertificateApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  // Lessons

  async getLessons(): Promise<any> {
    return await instance.get("https://www.bilimge.kz/admins/api/subject/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getLessonsId(id?: number): Promise<any> {
    return await instance.get(
      `https://www.bilimge.kz/admins/api/subject/${id}/`,
      {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      },
    );
  },

  // Extra Lessons

  async getExtraLessons(): Promise<IExtraLessons[]> {
    return await instance.get("https://www.bilimge.kz/admins/api/extra_lesson/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getExtraLessonsById(id?: number): Promise<IExtraLessons> {
    return await instance.get(`https://www.bilimge.kz/admins/api/extra_lesson/${id ? id : ""}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  // Calls

  async getCallsDop(): Promise<ICalls[]> {
    return await instance.get("https://bilimge.kz/admins/api/DopUrokRingApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getCallsDopId(id?: number): Promise<ICalls> {
    return await instance.get(`https://bilimge.kz/admins/api/DopUrokRingApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getCallsOS(): Promise<ICalls[]> {
    return await instance.get("https://bilimge.kz/admins/api/ringApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getCallsOSId(id?: number): Promise<ICalls> {
    return await instance.get(`https://bilimge.kz/admins/api/ringApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getPrideClasses(): Promise<IClassName[]> {
    return await instance.get("https://www.bilimge.kz/admins/api/available_classes/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getTeachers(): Promise<ITeachers[]> {
    return await instance.get("https://bilimge.kz/admins/api/teacher/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getTeachersId(id?: number): Promise<ITeachers> {
    return await instance.get(`https://bilimge.kz/admins/api/teacher/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getNews(): Promise<INews[]> {
    return await instance.get("https://bilimge.kz/admins/api/newsApi/", {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getNewsId(id?: number): Promise<INews> {
    return await instance.get(`https://bilimge.kz/admins/api/newsApi/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  // Avalibale

  async getAvailableSchool(): Promise<IASchool[]> {
    return await instance.get(
      `https://www.bilimge.kz/admins/api/available_school/`,
      {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      },
    );
  },

  async getAvalibaleClasses(class_name?: string): Promise<IAClass[]> {
    return await instance.get(`https://www.bilimge.kz/admins/api/available_classes/`, {
      params: {
        class_name,
      },
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getAvalibaleClassRooms(): Promise<IAClassRooms[]> {
    return await instance.get(`https://bilimge.kz/admins/api/available_classrooms/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getAvalibaleRing(start_time?: string): Promise<IARing[]> {
    return await instance.get(`https://bilimge.kz/admins/api/available_ring/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
      params: {
        start_time,
      },
    });
  },

  async getAvailableDopring(): Promise<IADopRing[]> {
    return await instance.get(`https://bilimge.kz/admins/api/available_dopurok_ring/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getAvalibaleSubject(): Promise<IASubjet[]> {
    return await instance.get(`https://bilimge.kz/admins/api/available_subject/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getAvalibaleTypez(): Promise<IATypeZ[]> {
    return await instance.get(`https://bilimge.kz/admins/api/available_typez/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSchedule(): Promise<ISchedule[]> {
      return await instance.get(`https://bilimge.kz/admins/api/schedule/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getDopSchedule(): Promise<IDopSchedule[]> {
    return await instance.get(`https://bilimge.kz/admins/api/DopUrokApi/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getNotification(): Promise<INotification[]> {
    return await instance.get(`https://bilimge.kz/admins/api/notification/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getNotificationId(id?: number): Promise<INotification> {
    return await instance.get(`https://bilimge.kz/admins/api/notification/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getMap(): Promise<IMap[]> {
    return await instance.get(`https://bilimge.kz/admins/api/schoolmap/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getMapId(id?: number): Promise<IMap> {
    return await instance.get(`https://bilimge.kz/admins/api/schoolmap/${id}`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },

  async getSlider(): Promise<ISlider[]> {
    return await instance.get(`https://bilimge.kz/admins/api/main_slider/`, {
      headers: {
        Authorization: `Token ${getTokenInLocalStorage()}`,
      },
    });
  },
};
