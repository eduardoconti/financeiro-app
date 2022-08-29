import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import React from "react";
type StateError = {
  error?: any;
  errorInfo?: any;
};
export default class ErrorBoundary extends React.Component<any, StateError> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error: any, info: any) {
    this.setState({
      error,
      errorInfo: info,
    });
  }

  render() {
    const handleClose = () => {
      this.setState({ error: null, errorInfo: null });
    };

    const autoHide = this.state?.error?.invalidFields
      ? this.state.error?.invalidFields.length * 2000
      : 4000;
    const { theme } = this.props;
    const anchorOrigin = {
      vertical:
        window.innerWidth > theme.breakpoints.values.sm ? "bottom" : "top",
      horizontal:
        window.innerWidth > theme.breakpoints.values.sm ? "left" : "center",
    };
    return (
      <React.Fragment>
        <Snackbar
          open={this.state?.error ? true : false}
          anchorOrigin={anchorOrigin as SnackbarOrigin}
          autoHideDuration={autoHide}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            <AlertTitle>{this.state?.error?.title}</AlertTitle>
            {this.state?.error?.detail}
            <ul style={{ padding: 0 }}>
              {this.state?.error?.invalidFields
                ? (this.state?.error?.invalidFields).map(
                    (field: any, i: number) => {
                      return <li key={i}>{field.reason}</li>;
                    }
                  )
                : null}
            </ul>
          </Alert>
        </Snackbar>
        {this.props.children}
      </React.Fragment>
    );
  }
}
