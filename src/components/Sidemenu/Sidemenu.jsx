import React, {useState} from "react";

import Waves from "../../assets/sidemenu-waves.svg";

import {List, ListItemIcon, ListItemText, Collapse, ListSubheader} from "@material-ui/core";

import SidemenuItem from "./SidemenuItem";
import SidemenuCollapse from "./SidemenuCollapse";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import LineStyleIcon from '@material-ui/icons/LineStyle';

/* MenuItem ::
 * Use this as shortcut to add item into `Sidemenu` component. */

const MenuItem = (path = "/", text = "", icon) =>
	<SidemenuItem path={path} button>
		{icon && <ListItemIcon children={icon} />}
		<ListItemText primary={text} />
	</SidemenuItem>

/* MenuCollapse ::
 * Use this as shortcut to add collapsable item into `Sidemenu` component. */

const MenuCollapse = (initOpen = false, text = "", subheader = false, icon, children) => {
	if (!children) return null;
	return (
		<SidemenuCollapse initState={initOpen} label={text} icon={icon ? icon : null} subheader={subheader}>
			{children}
		</SidemenuCollapse>
	);
}

const Sidemenu = () => {
	return (
		<div className="Sidemenu-Root">
			<div className="Sidemenu-Header">
				<span>Socializer™</span>
			</div>
			<div className="Sidemenu-Waves">
				<img src={Waves} />
			</div>
			<List
				component="nav"
				className="Sidemenu-List"
			>
				{MenuItem("/profile", "Профиль", <AccountBoxIcon />)}
				{MenuItem("/chat", "Чаты", <QuestionAnswerIcon />)}
				{MenuItem("/friends", "Друзья", <PeopleAltIcon />)}
				{
					MenuCollapse(false, "Разное", "Вложенный раздел", <LineStyleIcon />, [
						MenuItem("/login", "Login", <LineStyleIcon />),
						MenuItem("/registration", "Registration", <LineStyleIcon />)
					])
				}
			</List>
		</div>
	)
};

export default Sidemenu;