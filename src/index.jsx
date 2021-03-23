import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider as ReduxProvider} from "react-redux";
import store from "./redux/store";

import MuiThemeProvider from "./theme/mui";

ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</ReduxProvider>
	</React.StrictMode>,
	document.getElementById('root')
);