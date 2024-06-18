let initialState = {
        lang: "en",
        dir: "ltr",
        dataNavLayout: "vertical",
        class: "light",
        dataHeaderStyles: "light",
        dataMenuStyles: "dark",
        dataVerticalStyle: "overlay",
        StylebodyBg:"107 64 64",
        StyleDarkBg:"93 50 50",
        toggled:"closed",
        dataNavStyle:"",
        horStyle:"",
        dataPageStyle:"regular",
        dataWidth:"fullwidth",
        dataMenuPosition:"fixed",
        dataHeaderPosition:"fixed",
        iconOverlay:"",
        colorPrimaryRgb:"",
        colorPrimary:"",
        bodyBg:"",
        darkBg:"",
        bgImg:"",
        iconText:"",
        body:{
            class:""
        }
};

export default function reducer(state = initialState, action:any) {
  let { type, payload } = action;

  switch (type) {

    case "ThemeChanger":
      
      state = payload
      return state

    default:
      return state;
  }
}