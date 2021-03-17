import React from "react";

import "./styles.scss";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {useLogged} from "./services/user.service";
import Login from "./components/login.page";
import Profile from "./components/profile.page";
import Registration from "./components/registration.page";

import Sidemenu from "./components/Sidemenu/index";


function App() {
	const logged = useLogged();

	return (
		<div className="app">
			<BrowserRouter>
				<Sidemenu/>
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
					<Route path="/profile">
						<p>Profile</p>
					</Route>
					<Route path="/chat">
						<p>Chat</p>
					</Route>
					<Route path="/friends">
						<p>Friends</p>
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
