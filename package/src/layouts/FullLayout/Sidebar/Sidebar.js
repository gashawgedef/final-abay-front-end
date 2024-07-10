import React from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import { HQMenuitems, BRMenuitems } from "./data";
import { currentUser } from "../../../utils/tokenUtils";
import { test_branch_type } from "../../../utils/constants";

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    setOpen(open === index ? !open : index);
  };

  const user = currentUser() || { branch_type: '' };
  const Menuitems = user.branch_type === test_branch_type ? HQMenuitems : BRMenuitems;

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)", background: "#F8F8FF" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoIcon />
        </Box>
      </Link>
      <Box>
        <List sx={{ mt: 4 }}>
          {Menuitems.map((item, index) => (
            <List component="li" disablePadding key={item.title}>
              <ListItem
                onClick={() => handleClick(index)}
                button
                component={NavLink}
                to={item.href}
                selected={pathname === item.href}
                sx={{
                  mb: 1,
                  ...(pathname === item.href && {
                    color: "white",
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.main}!important`,
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    ...(pathname === item.href && { color: "white" }),
                  }}
                >
                  <item.icon width="20" height="20" />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={lgUp ? props.isSidebarOpen : props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: { width: SidebarWidth },
      }}
      variant={lgUp ? "persistent" : "temporary"}
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
