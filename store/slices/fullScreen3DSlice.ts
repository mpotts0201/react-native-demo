// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum AnimationNames {
    ORDERED = "ORDERED",
    PIZZA = "PIZZA"
}

export interface FullScreen3DState {
  show: boolean;
  animationName: AnimationNames
}

const initialState: FullScreen3DState = {
  show: false,
  animationName: AnimationNames.ORDERED
};

export const fullScreen3DSlice = createSlice({
  name: 'fullScreen3D',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setAnimationName: (state, action: PayloadAction<AnimationNames>) => {
        state.animationName = action.payload;
    }
  },
});

export const { setShow, setAnimationName } = fullScreen3DSlice.actions;

// Other code such as selectors can be imported from the store file
export const selectShow = (state: RootState) => state.fullScreen3D.show;
export const selectAnimationName = (state: RootState) => state.fullScreen3D.animationName;

export default fullScreen3DSlice.reducer;
