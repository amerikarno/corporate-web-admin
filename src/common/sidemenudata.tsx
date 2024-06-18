

export interface sidemenuType {
	active?: boolean;
	selected?: boolean;
	id?: number;
	menutitle?: string;
	Items?: sidemenuType[];
	icon?: JSX.Element;
	title?: string;
	type?: string;
	children?: sidemenuType[];
	path?: string;
}


//Svg icons of Dashboard

const Dashboardsvg = <i className="ri-home-8-line side-menu__icon"></i>

const AuthenticationSvg = <i className="ri-error-warning-line side-menu__icon"></i>



export const MenuItems: sidemenuType[] = [
	{ id: 1, menutitle: "MAIN", Items: [

			{ id: 2,icon: Dashboardsvg, title: "Dashboards", type: "sub", active: false, selected: false, children: [

					{ id: 3, path: `${import.meta.env.BASE_URL}dashboards/sales`, type: "link", active: false, selected: false, title: "Sales" },
					
				],
			},
		]
	},



	{ menutitle: "PAGES", Items: [

			{ id: 4, icon: AuthenticationSvg, title: "Authentication", type: "sub", active: false, selected: false, children: [
					{ id: 5, type: "sub", active: false, selected: false, title: "Error Pages", children: [

							{ id: 6, path: `${import.meta.env.BASE_URL}Authentication/errorpage/error404`, type: "link", active: false, selected: false, title: "404 Error" },
						]
					},
				]
			},
		]
	},

];
export default MenuItems
