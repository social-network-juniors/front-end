import React from "react";

import Waves from "assets/sidemenu-waves.svg";

const SideMenu = () => {
	return (
		<div className="SideMenu-Root">
			Sidemenu
			<div className="SideMenu-Waves">
				<img src={Waves}/>
			</div>
		</div>
	)
};

export default SideMenu;