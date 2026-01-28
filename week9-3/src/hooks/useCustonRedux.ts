import { TypedUseSelectorHook, useDispatch as useDefalutDispatch, useSelector as useDefalutSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefalutDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useDefalutSelector;
