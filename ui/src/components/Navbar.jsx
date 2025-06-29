import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const navItems = [
  { id: 1, label: "Home", route: "/" },
  { id: 2, label: "Services", route: "/services" },
  { id: 3, label: "Booking", route: "/booking" },
  { id: 4, label: "Two Wheeler List", route: "/list" },
  { id: 5, label: "Blogs", route: "/blogs" },
  { id: 6, label: "Contact Us", route: "/contact" },
];

const Navbar = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const logoutUser = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <i className="fas fa-motorcycle" style={{ marginRight: 8 }}></i> Hamro
        Bike
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate(item.route)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={logoutUser}
            sx={{ justifyContent: "center" }}
          >
            <i className="fas fa-sign-out-alt" style={{ marginRight: 6 }}></i>{" "}
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
            }}
          >
            <i className="fas fa-bicycle" style={{ marginRight: 8 }}></i>Hamro
            Bike
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{
                  color: "#fff",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)", color: "#FFD700" },
                }}
                onClick={() => navigate(item.route)}
              >
                {item.label}
              </Button>
            ))}
            <Button
              sx={{
                color: "#fff",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.1)", color: "#ff5252" },
              }}
              onClick={logoutUser}
              startIcon={<i className="fas fa-sign-out-alt"></i>}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
