import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSchoolSportThunk = createAsyncThunk(
  "getSchoolSportThunk",
  async () => await assetsApi.getSchoolSport(),
);

export const getSchoolSportIdThunk = createAsyncThunk(
  "getSchoolSportIdThunk",
  async (id?: number) => await assetsApi.getSchoolSportId(id),
);

export const getSchoolAltynThunk = createAsyncThunk(
  "getSchoolAltynThunk",
  async () => await assetsApi.getSchoolAltyn(),
);

export const getSchoolAltynIdThunk = createAsyncThunk(
  "getSchoolAltynIdThunk",
  async (id?: number) => await assetsApi.getSchoolAltynId(id),
);

export const getSchoolOlimpThunk = createAsyncThunk(
  "getSchoolOlimpThunk",
  async () => await assetsApi.getSchoolOlimp(),
);

export const getSchoolOlimpIdThunk = createAsyncThunk(
  "getSchoolOlimpIdThunk",
  async (id?: number) => await assetsApi.getSchoolOlimpId(id),
);

export const getSchoolAtestThunk = createAsyncThunk(
  "getSchoolAtestThunk",
  async () => await assetsApi.getSchoolAtestat(),
);

export const getSchoolAtestIdThunk = createAsyncThunk(
  "getSchoolAtestIdThunk",
  async (id?: number) => await assetsApi.getSchoolAtestatId(id),
);

export const getSchoolOnerThunk = createAsyncThunk(
  "getSchoolOnerThunk",
  async () => await assetsApi.getSchoolOner(),
);

export const getSchoolOnerIdThunk = createAsyncThunk(
  "getSchoolOnerIdThunk",
  async (id?: number) => await assetsApi.getSchoolOnerId(id),
);

export const getPrideThunk = createAsyncThunk(
    "getPrideThunk",
    async () => await assetsApi.getPride(),
);

export const getPrideIDThunk = createAsyncThunk(
    "getPrideIDThunk",
    async (id?: number) => await assetsApi.getPrideId(id),
);



export const getLessonsThunk = createAsyncThunk(
  "getLessonsThunk",
  async () => await assetsApi.getLessons(),
);

export const getLessonsIdThunk = createAsyncThunk(
  "getLessonsIdThunk",
  async (id?: number) => await assetsApi.getLessonsId(id),
);

export const getExtraThunk = createAsyncThunk(
  "getExtraThunk",
  async () => await assetsApi.getExtraLessons(),
);

export const getExtraIdThunk = createAsyncThunk(
  "getExtraIdThunk",
  async (id?: number) => await assetsApi.getExtraLessonsById(id),
);

export const getDopThunk = createAsyncThunk(
  "getDopThunk",
  async () => await assetsApi.getCallsDop(),
);

export const getDopIdThunk = createAsyncThunk(
  "getDopIdThunk",
  async (id?: number) => await assetsApi.getCallsDopId(id),
);

export const getOSThunk = createAsyncThunk(
  "getOSThunk",
  async () => await assetsApi.getCallsOS(),
);

export const getOSIdThunk = createAsyncThunk(
  "getOSIdThunk",
  async (id?: number) => await assetsApi.getCallsOSId(id),
);

export const getClassNameThunk = createAsyncThunk(
  "getClassNameThunk",
  async () => await assetsApi.getPrideClasses(),
);

export const getTeachersThunk = createAsyncThunk(
  "getTeachersThunk",
  async () => await assetsApi.getTeachers(),
);

export const getNewsThunk = createAsyncThunk(
  "getNewsThunk",
  async () => await assetsApi.getNews(),
);

export const getNewsIdThunk = createAsyncThunk(
  "getNewsIdThunk",
  async (id?: number) => await assetsApi.getNewsId(id),
);
