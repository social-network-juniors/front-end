import {useState} from "react";
import {useSelector} from "react-redux";
import store from "../redux/store";

/* Regular */

export const isLogged = () => Boolean(store.getState().user.logged);

/* Hooks */

export const useLogged = () => {
	const storeLogged = useSelector(store => store.user.logged);
	const [logged, setLogged] = useState(storeLogged);

	if (logged !== storeLogged)
		setLogged(storeLogged);

	return logged;
};

