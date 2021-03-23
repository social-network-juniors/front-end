import {createElement} from "react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
			xxl: 1400
		}
	}
});

const ThemeProvider = ({children}) =>
	<MuiThemeProvider theme={theme}>
		{children}
	</MuiThemeProvider>

export default ThemeProvider;