import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
import {
    getDopScheduleThunk,
    getIAClassRoomThunk,
    getIAClassThunk, getIADopRingThunk,
    getIARingThunk,
    getIASchoolThunk,
    getIASubjectThunk,
    getIATypeZThunk,
    getScheduleThunk,
    getTeacherIdThunk,
    getUserIdThunk,
} from "../thunks/available.thunk";
import { initaialStateIA } from "../types/available.system";

export const availabelInfoSlice = createSlice({
  name: "availabelInfoSlice",
  initialState: initaialStateIA,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getIASchoolThunk.fulfilled,
        (state, action: PayloadAction<IASchool[]>) => {
          if (action.payload) {
            return {
              ...state,
              iaschool: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getIAClassThunk.fulfilled,
        (state, action: PayloadAction<IAClass[]>) => {
          if (action.payload) {
            return {
              ...state,
              iaclass: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getIAClassRoomThunk.fulfilled,
        (state, action: PayloadAction<IAClassRooms[]>) => {
          if (action.payload) {
            return {
              ...state,
              iaclassrooms: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getIARingThunk.fulfilled,
        (state, action: PayloadAction<IARing[]>) => {
          if (action.payload) {
            return {
              ...state,
              iaring: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getIASubjectThunk.fulfilled,
        (state, action: PayloadAction<IASubjet[]>) => {
          if (action.payload) {
            return {
              ...state,
              iasubject: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getIATypeZThunk.fulfilled,
        (state, action: PayloadAction<IATypeZ[]>) => {
          if (action.payload) {
            return {
              ...state,
              iatypez: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getUserIdThunk.fulfilled,
        (state, action: PayloadAction<IUsers>) => {
          if (action.payload) {
            return {
              ...state,
              userid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getTeacherIdThunk.fulfilled,
        (state, action: PayloadAction<ITeachers>) => {
          if (action.payload) {
            return {
              ...state,
              teachersid: action.payload,
            };
          }
          return state;
        },
      )
      .addCase(
        getScheduleThunk.fulfilled,
        (state, action: PayloadAction<ISchedule[]>) => {
          if (action.payload) {
            return {
              ...state,
              sch: action.payload,
            };
          }
          return state;
        },
      ).addCase(
        getDopScheduleThunk.fulfilled,
        (state, action: PayloadAction<IDopSchedule[]>) => {
            if (action.payload) {
                return {
                    ...state,
                    dopSch: action.payload,
                };
            }
            return state;
        },
    ).
      addCase(
          getIADopRingThunk.fulfilled,
          (state, action: PayloadAction<IADopRing[]>) => {
              if (action.payload) {
                  return {
                      ...state,
                      iaDopRing: action.payload,
                  };
              }
              return state;
          },
      );
  },
});

export const { actions } = availabelInfoSlice;

export default availabelInfoSlice.reducer;
