import React, {FC, PropsWithChildren} from 'react';
import {ICar} from "../../inrterfaces";
import {useAppDispatch} from "../../hooks";
import {carActions} from "../../store";

interface IProps extends PropsWithChildren {
        car:ICar
}

const Car: FC<IProps> = ({car}) => {
    const {id,year,price,brand} = car;

    const dispatch = useAppDispatch();

    return (
        <div>
            <div>id={id}</div>
            <div>year={year}</div>
            <div>price={price}</div>
            <div>brand={brand}</div>
            <button onClick={()=>dispatch(carActions.setCarForUpdate(car))} >update</button>
            <button onClick={()=>dispatch(carActions.deleteCar({car}))} >delete</button>
        </div>
    );
};

export {Car};