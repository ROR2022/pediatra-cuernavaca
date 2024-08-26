import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface DataUser {
    username: string;
    avatar: string;
    email: string;
    active: boolean;
    access_token: string;
    role: string;
}

export const initialState: DataUser = {
    username: '',
    avatar: '',
    email: '',
    active: false,
    access_token: '',
    role: 'guest',
};

export interface RootState {
    user: DataUser;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<DataUser>) => {
            
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
            state.active = action.payload.active;
            state.access_token = action.payload.access_token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.username = '';
            state.avatar = '';
            state.email = '';
            state.active = false;
            state.access_token = '';
            state.role = 'guest';
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;