import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initaialStateSchoolInfo } from "../types/schoolInfo.system";
import {
    getClassIdThunk,
    getClassRoomIdThunk,
    getClassRoomThunk,
    getClassThunk,
    getKruzhokInfoIdThunk,
    getKruzhokInfoThunk,
    getKruzhokTeachersInfoThunk, getMapIdThunk, getMapThunk,
    getMenuIdThunk,
    getMenuThunk, getNotificationIdThunk, getNotificationThunk,
    getSchoolAdminIdThunk,
    getSchoolAdminThunk, getSchoolDirectorThunk,
    getSchoolIdThunk,
    getSchoolPassportThunk,
    getSchoolPhotosIdThunk,
    getSchoolPhotosThunk,
    getSchoolSocialIdThunk,
    getSchoolSocialThunk,
    getSchoolThunk, getSliderThunk,
    getUsersThunk,
} from "../thunks/schoolnfo.thunk";
import {
    IClass,
    IClassRoom,
    IKruzhok, IMap,
    IMenu, INotification,
    ISchoolAdmin, ISchoolDirector,
    ISchoolInfo,
    ISchoolPassport,
    ISchoolPhotos,
    ISchoolSocialMedia, ISlider,
    IUsers,
} from "@/types/assets.type";

export const schoolInfoSlice = createSlice({
  name: "schoolInfo",
  initialState: initaialStateSchoolInfo,
  reducers: {},
    extraReducers: function (builder) {
        // @ts-ignore
        builder
            .addCase(
                getKruzhokInfoThunk.fulfilled,
                (state, action: PayloadAction<IKruzhok[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            kruzhok: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getMenuThunk.fulfilled,
                (state, action: PayloadAction<IMenu[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            menu: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getClassRoomThunk.fulfilled,
                (state, action: PayloadAction<IClassRoom[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            classroom: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolThunk.fulfilled,
                (state, action: PayloadAction<ISchoolInfo[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            school: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getUsersThunk.fulfilled,
                (state, action: PayloadAction<IUsers[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            users: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolAdminThunk.fulfilled,
                (state, action: PayloadAction<ISchoolAdmin[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schooladmin: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolPassportThunk.fulfilled,
                (state, action: PayloadAction<ISchoolPassport[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolpassport: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolPhotosThunk.fulfilled,
                (state, action: PayloadAction<ISchoolPhotos[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolphotos: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolSocialThunk.fulfilled,
                (state, action: PayloadAction<ISchoolSocialMedia[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolsocial: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getKruzhokTeachersInfoThunk.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            teachers: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolIdThunk.fulfilled,
                (state, action: PayloadAction<ISchoolInfo>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getClassRoomIdThunk.fulfilled,
                (state, action: PayloadAction<IClassRoom>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            classroomid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getMenuIdThunk.fulfilled,
                (state, action: PayloadAction<IMenu>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            menuid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolSocialIdThunk.fulfilled,
                (state, action: PayloadAction<ISchoolSocialMedia>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolsocialid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getKruzhokInfoIdThunk.fulfilled,
                (state, action: PayloadAction<IKruzhok>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            kruzhokid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolAdminIdThunk.fulfilled,
                (state, action: PayloadAction<ISchoolAdmin>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schooladminid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getSchoolPhotosIdThunk.fulfilled,
                (state, action: PayloadAction<ISchoolPhotos>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            schoolphotosid: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getClassThunk.fulfilled,
                (state, action: PayloadAction<IClass[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            class: action.payload,
                        };
                    }
                },
            )
            .addCase(
                getClassIdThunk.fulfilled,
                (state, action: PayloadAction<IClass>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            classid: action.payload,
                        };
                    }
                },
            ).addCase(
            getSchoolDirectorThunk.fulfilled,
            (state, action: PayloadAction<ISchoolDirector[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        schooldirector: action.payload,
                    };
                }
            },
        ).addCase(
            getNotificationThunk.fulfilled,
            (state, action: PayloadAction<INotification[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        notifications: action.payload,
                    };
                }
            },
        ).addCase(
            getNotificationIdThunk.fulfilled,
            (state, action: PayloadAction<INotification>) => {
                if (action.payload) {
                    return {
                        ...state,
                        notificationId: action.payload,
                    };
                }
            },
        ).addCase(
            getMapThunk.fulfilled,
            (state, action: PayloadAction<IMap[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        maps: action.payload,
                    };
                }
            },
        ).addCase(
            getMapIdThunk.fulfilled,
            (state, action: PayloadAction<IMap>) => {
                if (action.payload) {
                    return {
                        ...state,
                        map: action.payload,
                    };
                }
            },
        ).addCase(
            getSliderThunk.fulfilled,
            (state, action: PayloadAction<ISlider[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        slider: action.payload,
                    };
                }
            },
        );
    },
});

export const { actions } = schoolInfoSlice;

export default schoolInfoSlice.reducer;
