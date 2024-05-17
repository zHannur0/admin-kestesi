import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIASchoolThunk = createAsyncThunk(
  "getIASchoolThunk",
  async () => await assetsApi.getAvailableSchool(),
);

export const getIAClassThunk = createAsyncThunk(
  "getIAClassThunk",
  async (class_name?: string) =>
    await assetsApi.getAvalibaleClasses(class_name),
);

export const getIAClassRoomThunk = createAsyncThunk(
  "getIAClassRoomThunk",
  async () => await assetsApi.getAvalibaleClassRooms(),
);

export const getIARingThunk = createAsyncThunk(
  "getIARingThunk",
  async (start_time?: string) => await assetsApi.getAvalibaleRing(start_time),
);

export const getIADopRingThunk = createAsyncThunk(
    "getIADopRingThunk",
    async () => await assetsApi.getAvailableDopring(),
);

export const getIASubjectThunk = createAsyncThunk(
  "getIASubjectThunk",
  async () => await assetsApi.getAvalibaleSubject(),
);

export const getIATypeZThunk = createAsyncThunk(
  "getIATypeZThunk",
  async () => await assetsApi.getAvalibaleTypez(),
);

export const getUserIdThunk = createAsyncThunk(
  "getUserIdThunk",
  async (id?: number) => await assetsApi.getUsersId(id),
);

export const getTeacherIdThunk = createAsyncThunk(
  "getTeacherIdThunk",
  async (id?: number) => await assetsApi.getTeachersId(id),
);

export const getScheduleThunk = createAsyncThunk(
  "getScheduleThunk",
  async () => await assetsApi.getSchedule(),
);

export const getDopScheduleThunk = createAsyncThunk(
    "getDopScheduleThunk",
    async () => await assetsApi.getDopSchedule(),
);
