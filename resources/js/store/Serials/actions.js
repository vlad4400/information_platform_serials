import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_SERIALS } from '../../utilities/Constants';
export const GET_ALL_SERIALS = "SERIALS/GET_ALL_SERIALS";

export const getAllSerials = createAsyncThunk(
    GET_ALL_SERIALS,
    async () => {
        const resp = await fetch(API_SERIALS);

        if (resp.ok) {
            const serials = await resp.json();
            return { serials };
        }
    }
);
