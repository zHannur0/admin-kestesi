import { RooteState } from "@/store/store";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RooteState> = useSelector;
