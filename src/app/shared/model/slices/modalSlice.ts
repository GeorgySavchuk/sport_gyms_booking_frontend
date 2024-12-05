import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalState {
    isVisible: boolean;
    content: string | null;
}
const initialState: ModalState = {
    isVisible: false,
    content: null,
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalVisibility: (state = initialState, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload
        },
        setModalContent: (state = initialState, action: PayloadAction<string | null>) => {
            state.content = action.payload
        }
    }
})
export const { setModalVisibility, setModalContent } = modalSlice.actions;
export default modalSlice.reducer