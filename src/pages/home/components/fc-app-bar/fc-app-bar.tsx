import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import HomeIcon from "@material-ui/icons/Home";
import { Grid, Tooltip } from "@material-ui/core";

import { ColorModeContext } from "App";
import { FcSelectMonthButton, FcSelectYearButton } from "@components/fc-button";
import { FcLoginModal } from "@pages/home/components/login";
import { useHistory } from "react-router-dom";
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
    },
    left: theme.spacing(1),
    padding: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: theme.palette.warning.light,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
    color: theme.palette.text.primary,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: "none",
  },
  sidebarWrapper: {
    position: "relative",
    overflow: "hidden",
    height: "100%",
    zIndex: theme.zIndex.drawer + 3,
    overflowScrolling: "touch",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    "& .MuiPaper-root": {
      border: 0,
    },
  },
  background: {
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    //alignItems: "center",
    //justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 4,
  },
  headerIcon: {
    padding: theme.spacing(1),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const colorMode = React.useContext(ColorModeContext);

  const history = useHistory();

  const routeChange = (path: any) => {
    history.push(path);
  };
  const OPTIONS_NAME = 0,
    OPTIONS_COMPONENT = 1,
    OPTIONS_ROUTE = 2;

  const menuOptions = [
    ["Categorias", <CategoryIcon />, `categorias`],
    ["Carteiras", <AccountBalanceWalletIcon />, "carteiras"],
    ["Transferencias", <AccountBalanceIcon />, "transferencias"],
  ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleOpen = () => {
    setOpenLogin(true);
  };

  return (
    <Grid className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <FcLoginModal
          open={openLogin}
          setOpen={(openLogin: boolean) => {
            setOpenLogin(openLogin);
          }}
          handleClose={() => {
            handleClose();
          }}
        />
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Tooltip title="Home">
            <IconButton
              color="inherit"
              aria-label="Login/Logout"
              onClick={() => routeChange(``)}
              className={classes.headerIcon}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.title}>
            {process.env.REACT_APP_ENVIRONMENT !== "production"
              ? "AMBIENTE DE TESTE"
              : null}
          </div>
          <div style={{ marginLeft: 10, marginRight: 10, width: 100 }}>
            <FcSelectMonthButton />
          </div>
          <div style={{ marginRight: 10, width: 100 }}>
            <FcSelectYearButton />
          </div>
          <Tooltip title="Set light/dark mode">
            <IconButton
              color="inherit"
              aria-label="Light/Dark"
              onClick={colorMode.toggleColorMode}
              className={classes.headerIcon}
            >
              {theme.palette.type === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Login">
            <IconButton
              color="inherit"
              aria-label="Login"
              onClick={() => handleOpen()}
              className={classes.headerIcon}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div className={classes.sidebarWrapper}>
          <List>
            {menuOptions.map((data) => (
              <ListItem
                button
                key={data[OPTIONS_NAME] as string}
                onClick={() => routeChange(data[OPTIONS_ROUTE])}
              >
                <Tooltip title={data[OPTIONS_NAME]}>
                  <ListItemIcon>{data[OPTIONS_COMPONENT]}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={data[OPTIONS_NAME]} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.background} />
      </Drawer>
    </Grid>
  );
}
