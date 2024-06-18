import { Fragment, useEffect } from 'react'
import Landingswitcher from './layoutsection/switcher/landingswitcher';
import { Outlet } from 'react-router-dom';
import Backtotop from './layoutsection/backtotop/backtotop';
import { Helmet } from "react-helmet-async";
import { Provider } from "react-redux";
import store from '../redux/store';


const Landingpagelayout = () => {

useEffect(() => {
  import("preline");
  
}, []);

  return (
    <Fragment>
      <Helmet
                htmlAttributes={{
					lang: "en",
					"data-menu-styles":"dark",
					dir: "ltr",
					class: "light",
					"data-nav-layout":"horizontal",
					"data-header-styles":"light",
					"data-vertical-style":"overlay",

                }}
            />
    <Provider store={store}>
        <Landingswitcher/>
        <Outlet/>
        <Backtotop/>
        <div id="responsive-overlay"></div>
    </Provider>
    </Fragment>
  )
}

export default Landingpagelayout