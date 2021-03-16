import React from "react";

import "styles.scss";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {useLogged} from "services/user.service";
import Login from "components/login.page";
import Profile from "components/profile.page";
import Registration from "components/registration.page";

import SideMenu from "components/SideMenu";


function App() {
	const logged = useLogged();

	return (
		<div className="app">
			<BrowserRouter>
				<SideMenu/>
				<main className="content">
				<Switch>
					<Route path="/login" component={Login}>
						{
							logged ?
								<Redirect to="/" /> : null
						}
					</Route>
					<Route path="/registration" component={Registration}>
						{
							logged ?
								<Redirect to="/" /> : null
						}
					</Route>
					<Route path="/">
						{
							logged ?
								<Profile /> : <Redirect to="/login" />

						}
					</Route>

				</Switch>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
