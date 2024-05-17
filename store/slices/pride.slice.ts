import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initaialStatePrideInfo } from "../types/pride.system";
import {
    getClassNameThunk,
    getDopIdThunk,
    getDopThunk,
    getExtraIdThunk,
    getExtraThunk,
    getLessonsIdThunk,
    getLessonsThunk,
    getNewsIdThunk,
    getNewsThunk,
    getOSIdThunk,
    getOSThunk, getPrideIDThunk, getPrideThunk,
    getSchoolAltynIdThunk,
    getSchoolAltynThunk,
    getSchoolAtestIdThunk,
    getSchoolAtestThunk,
    getSchoolOlimpIdThunk,
    getSchoolOlimpThunk,
    getSchoolOnerIdThunk,
    getSchoolOnerThunk,
    getSchoolSportIdThunk,
    getSchoolSportThunk,
    getTeachersThunk,
} from "../thunks/pride.thunk";
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
} from "@/types/assets.type";

export const pridelInfoSlice = createSlice({
  name: "pridelInfoSlice",
  initialState: initaialStatePrideInfo,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getSchoolSportThunk.fulfilled,
        (state, action: PayloadAction<ISchoolSport[]>) => {
          if (action.payload) {
            return {
              ...state,
              sport: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolAltynThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAltyn[]>) => {
          if (action.payload) {
            return {
              ...state,
              altyn: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolOnerThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOner[]>) => {
          if (action.payload) {
            return {
              ...state,
              oner: action.payload,
            };
          }
          return state;
        },
      )

      .addCase(
        getSchoolOlimpThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOlimp[]>) => {
          if (action.payload) {
            return {
              ...state,
              olimp: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolAtestThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAtest[]>) => {
          if (action.payload) {
            return {
              ...state,
              atest: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getLessonsThunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          if (action.payload) {
            return {
              ...state,
              lessons: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getExtraThunk.fulfilled,
        (state, action: PayloadAction<IExtraLessons[]>) => {
          if (action.payload) {
            return {
              ...state,
              extra: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getDopThunk.fulfilled,
        (state, action: PayloadAction<ICalls[]>) => {
          if (action.payload) {
            return {
              ...state,
              dop: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getOSThunk.fulfilled,
        (state, action: PayloadAction<ICalls[]>) => {
          if (action.payload) {
            return {
              ...state,
              os: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getClassNameThunk.fulfilled,
        (state, action: PayloadAction<IClassName[]>) => {
          if (action.payload) {
            return {
              ...state,
              classname: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getTeachersThunk.fulfilled,
        (state, action: PayloadAction<IClassName[]>) => {
          if (action.payload) {
            return {
              ...state,
              teachers: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getNewsThunk.fulfilled,
        (state, action: PayloadAction<INews[]>) => {
          if (action.payload) {
            return {
              ...state,
              news: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getExtraIdThunk.fulfilled,
        (state, action: PayloadAction<IExtraLessons>) => {
          if (action.payload) {
            return {
              ...state,
              extraid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getLessonsIdThunk.fulfilled,
        (state, action: PayloadAction<ILessons>) => {
          if (action.payload) {
            return {
              ...state,
              lessonsid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getDopIdThunk.fulfilled,
        (state, action: PayloadAction<ICalls>) => {
          if (action.payload) {
            return {
              ...state,
              dopid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getOSIdThunk.fulfilled,
        (state, action: PayloadAction<ICalls>) => {
          if (action.payload) {
            return {
              ...state,
              osid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getNewsIdThunk.fulfilled,
        (state, action: PayloadAction<INews>) => {
          if (action.payload) {
            return {
              ...state,
              newsid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolSportIdThunk.fulfilled,
        (state, action: PayloadAction<ISchoolSport>) => {
          if (action.payload) {
            return {
              ...state,
              sportid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolAltynIdThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAltyn>) => {
          if (action.payload) {
            return {
              ...state,
              altynid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolAtestIdThunk.fulfilled,
        (state, action: PayloadAction<ISchoolAtest>) => {
          if (action.payload) {
            return {
              ...state,
              atestid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolOlimpIdThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOlimp>) => {
          if (action.payload) {
            return {
              ...state,
              olimpid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getSchoolOnerIdThunk.fulfilled,
        (state, action: PayloadAction<ISchoolOner>) => {
          if (action.payload) {
            return {
              ...state,
              onerid: action.payload,
            };
          }
          return state;
        },
      ).addCase(
        getPrideThunk.fulfilled,
        (state, action: PayloadAction<ISchoolPride[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    pride: action.payload,
                };
            }
            return state;
        },
    ).addCase(
        getPrideIDThunk.fulfilled,
        (state, action: PayloadAction<ISchoolPride>) => {
            if (action.payload) {
                return {
                    ...state,
                    prideId: action.payload,
                };
            }
            return state;
        },
    );
  },
});

export const { actions } = pridelInfoSlice;

export default pridelInfoSlice.reducer;
