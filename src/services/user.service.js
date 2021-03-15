import { useState, useEffect } from "react";
import store from "../redux/store";

/* Regular */

export const isLogged = () => Boolean(store.getState().user.logged);

/* Hooks */

export const useLogged = () => {
	const [logged, setLogged] = useState(store.getState().user.logged);

	useEffect(() => {
		store.subscribe(handleLoggedChange);
	}, []);

	const handleLoggedChange = () => setLogged(store.getState().user.logged);

	return logged;
};

