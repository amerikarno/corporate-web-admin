import { Dispatch } from 'redux';

export const ThemeChanger = (value: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  });
  
};
