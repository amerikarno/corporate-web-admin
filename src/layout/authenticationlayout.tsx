import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../redux/store';

const Authenticationlayout = () => {

    useEffect(() => {
        import("preline");
    }, []);


    return (
        <Fragment>
            <Helmet>
                <html className="h-full"></html>
            </Helmet>
            <Provider store={store}>
            <Outlet />
            </Provider>
        </Fragment>
    )
}

export default Authenticationlayout;