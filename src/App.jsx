import React from "react";

import "./styles.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { useLogged } from "./services/UserService";
import Login from "./components/login.page";
import Profile from "./components/profile.page";
import Registration from "./components/registration.page";
import Friends from "./components/Friends/friends.page";
import Chat from "./components/Chat/chat.page";

import Sidemenu from "./components/Sidemenu/index";
import Loader from "./components/Loader";


function App() {
	const logged = useLogged();
	return (
		<div className="app">
			<BrowserRouter>
				<Sidemenu />
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
							<Profile />
						</Route>
						<Route path="/chat">
							<Chat />
						</Route>
						<Route path="/friends">
							{/* {
								logged ?
									<Friends /> : <Redirect to="/login" />
							} */}
							<Friends />
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
