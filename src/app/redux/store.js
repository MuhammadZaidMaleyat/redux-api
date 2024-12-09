// "use client";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export const useAppSelector = (state) => state.pokemon;
export const useAppDispatch = () => useDispatch();
