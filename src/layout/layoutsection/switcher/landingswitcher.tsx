import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Themeprimarycolor, * as landingpageswitcherdata from "../../../common/landingpageswitcherdata"
import { ThemeChanger } from "../../../redux/Action"
import { connect } from "react-redux"
import { Helmet } from 'react-helmet';

interface datatype {
  local_varaiable: any
  ThemeChanger: any

}

const Landingswitcher = ({ local_varaiable, ThemeChanger }: datatype) => {

  useEffect(() => {
    ThemeChanger({
      ...local_varaiable,
      "dataNavLayout": "horizontal",
      "dataNavStyle": "menu-click",
      "dataMenuPosition": "fixed",
      "class": "h-full",
      "dataHeaderStyles": "",
      "dataMenuStyles": "",
      "dataVerticalStyle": "",
      "iconOverlay": ""
    })
  }, [])


  return (
    <div>
      <Helmet>
        <html dir={local_varaiable.dir}
          className={local_varaiable.class}
          data-header-styles={local_varaiable.dataHeaderStyles}
          data-vertical-style={local_varaiable.dataVerticalStyle}
          data-nav-layout={local_varaiable.dataNavLayout}
          data-menu-styles={local_varaiable.dataMenuStyles}
          data-toggled={local_varaiable.toggled}
          data-nav-style={local_varaiable.dataNavStyle}
          hor-style={local_varaiable.horStyle}
          data-page-style={local_varaiable.dataPageStyle}
          data-width={local_varaiable.dataWidth}
          data-menu-position={local_varaiable.dataMenuPosition}
          data-header-position={local_varaiable.dataHeaderPosition}
          icon-overlay={local_varaiable.iconOverlay}
          bg-img={local_varaiable.bgImg}
        ></html>
        <body className="landing-body"></body>
        <style type="text/css">
          {`
      :root {
        ${local_varaiable.colorPrimaryRgb !== '' ? `--color-primary-rgb:${local_varaiable.colorPrimaryRgb}` : ''};
        ${local_varaiable.colorPrimary !== '' ? `--color-primary:${local_varaiable.colorPrimary}` : ''};
        ${local_varaiable.bodyBg !== '' ? `--body-bg:${local_varaiable.bodyBg}` : ''};
        ${local_varaiable.darkBg !== '' ? `--dark-bg:${local_varaiable.darkBg}` : ''};
      }
    `}
        </style>
      </Helmet>

      <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
        <div className="ti-offcanvas-header">
          <h3 className="ti-offcanvas-title">
            Switcher
          </h3>
          <button type="button"
            className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-white/70 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
            data-hs-overlay="#hs-overlay-switcher">
            <span className="sr-only">Close modal</span>
            <i className="ri-close-circle-line leading-none text-lg"></i>
          </button>
        </div>
        <div className="ti-offcanvas-body" id="switcher-body">
          <div className="space-y-6">
            <div className="space-y-6">
              <p className="switcher-style-head">Theme Color Mode:</p>
              <div className="grid grid-cols-3 gap-6 switcher-style">
                <div className="flex">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme" onClick={() => landingpageswitcherdata.Light(local_varaiable, ThemeChanger)} defaultChecked />
                  <label htmlFor="switcher-light-theme"
                    className="text-xs text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Light</label>
                </div>
                <div className="flex">
                  <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme" onClick={() => landingpageswitcherdata.Dark(local_varaiable, ThemeChanger)} />
                  <label htmlFor="switcher-dark-theme"
                    className="text-xs text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Dark</label>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="switcher-style-head">Directions:</p>
              <div className="grid grid-cols-3 gap-6 switcher-style">
                <div className="flex">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr" onClick={() => landingpageswitcherdata.Ltr(local_varaiable, ThemeChanger)} defaultChecked />
                  <label htmlFor="switcher-ltr" className="text-xs text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">LTR</label>
                </div>
                <div className="flex">
                  <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl" onClick={() => landingpageswitcherdata.Rtl(local_varaiable, ThemeChanger)} />
                  <label htmlFor="switcher-rtl" className="text-xs text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">RTL</label>
                </div>
              </div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Primary:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary"
                    id="switcher-primary" defaultChecked onClick={() => landingpageswitcherdata.primaryColor1(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary"
                    id="switcher-primary1" onClick={() => landingpageswitcherdata.primaryColor2(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary"
                    id="switcher-primary2" onClick={() => landingpageswitcherdata.primaryColor3(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary"
                    id="switcher-primary3" onClick={() => landingpageswitcherdata.primaryColor4(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary"
                    id="switcher-primary4" onClick={() => landingpageswitcherdata.primaryColor5(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select ltr:pl-0 rtl:pr-0 mt-1 color-primary-light">

                </div>
                <Themeprimarycolor theme={local_varaiable} actionfunction={ThemeChanger} />

              </div>
            </div>
            <div className="theme-colors">
              <p className="switcher-style-head">Theme Background:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-1" type="radio" name="theme-background"
                    id="switcher-background" defaultChecked onClick={() => landingpageswitcherdata.backgroundColor1(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-2" type="radio" name="theme-background"
                    id="switcher-background1" onClick={() => landingpageswitcherdata.backgroundColor2(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-3" type="radio" name="theme-background"
                    id="switcher-background2" onClick={() => landingpageswitcherdata.backgroundColor3(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-4" type="radio" name="theme-background"
                    id="switcher-background3" onClick={() => landingpageswitcherdata.backgroundColor4(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-5" type="radio" name="theme-background"
                    id="switcher-background4" onClick={() => landingpageswitcherdata.backgroundColor5(local_varaiable, ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select ltr:pl-0 rtl:pr-0 mt-1 color-bg-transparent">

                </div>
                <landingpageswitcherdata.Themebackgroundcolor theme={local_varaiable} actionfunction={ThemeChanger} />
              </div>
            </div>
          </div>
        </div>
        <div className="ti-offcanvas-footer">
          <Link className="ti-btn ti-btn-primary" target="_blank" to="https://themeforest.net/item/synto-reactjs-tailwindcss-admin-dashboard-template/47177392">Try Now</Link>
          <Link className="ti-btn ti-btn-secondary" target="_blank" to="https://themeforest.net/user/spruko/portfolio">Our Protfolio</Link>
          <Link id="reset-all" className="ti-btn ti-btn-danger" to="#" onClick={() => landingpageswitcherdata.LandingpageReset(local_varaiable, ThemeChanger)} >Reset</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state
})

export default connect(mapStateToProps, { ThemeChanger })(Landingswitcher);
