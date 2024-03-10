import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {ICar} from "../../inrterfaces";
import {carService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    cars:ICar[],
    carForUpdate:ICar,
    trigger:boolean
}

const initialState:IState={
    cars:[],
    carForUpdate:null,
    trigger:null
};

// повертає масив ІКар, приймати не буде нічого- войд

const getAll = createAsyncThunk<ICar[],void>(
    'carSlice/getAll',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await carService.getAll();
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

// нічого не повертає, а приймає обєкт кар типу ІКар одну машину
const create = createAsyncThunk<void, {car:ICar} >(
    'carSlice/create',
    async ({car}, {rejectWithValue})=>{
        try {
            await carService.create(car);
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteCar = createAsyncThunk<void, {car:ICar}>(
    'carSlice/delete',
    async ({car}, {rejectWithValue})=>{
        try {
            await carService.deleteById(car.id)
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers:{
        setCarForUpdate:(state, action)=>{
            state.carForUpdate = action.payload
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars=action.payload
            })
            .addMatcher(isFulfilled(create), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isFulfilled(deleteCar), state => {
                state.trigger = !state.trigger
            })
})

const {reducer:carReducer, actions} = carSlice;

const carActions={
    ...actions,
    getAll,
    create,
    deleteCar
}

export {
    carReducer,
    carActions
}