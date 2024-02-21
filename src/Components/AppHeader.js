import React from 'react';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, NavLink } from 'react-router-dom';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const AppHeader = ({ auth, logout, cartCount, products }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "0" }}>
      <Toolbar>
        <Button sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            onClick={() => { navigate("/") }}
            component="img"
            sx={{
              height: "11rem", width: "11rem", paddingTop: "50px"
            }}
            alt="pic of a record"
            src="/public/assets/SpinnersHB.png"
          >
          </Box>
        </Button>

        {/* Centered SPINNERS Typography */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            marginTop: 10,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            noWrap
            sx={{ fontSize: "5rem", mb: -1.5, fontFamily: "Noteworthy" }}
          >
            {`SPINNERS`}
          </Typography>

          {/* SHOP and Preorder Tooltips side by side */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <Tooltip title={"Shop"} color="inherit" fontFamily="Noteworthy">
              <NavLink
                to='/products'
                activeClassName="selectedLink"
                className="navLink"
                style={{
                  color: 'limegreen',
                  padding: '0.5rem',  // Adjust padding as needed
                  textDecoration: 'none',  // Remove underline
                }}
              >
                Shop
              </NavLink>
            </Tooltip>
            <Tooltip title={"Preorder"} color="inherit" fontFamily="Noteworthy" sx={{ marginLeft: 2 }}>
              <NavLink
                to='/preorder'
                activeClassName="selectedLink"
                className="navLink"
                style={{
                  color: 'limegreen',
                  padding: '0.5rem',  // Adjust padding as needed
                  textDecoration: 'none',  // Remove underline
                }}
              >
                Pre-Order
              </NavLink>
            </Tooltip>
          </Box>
        </Box>

        {/* User Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {auth.id && (
            <>
              {/* Cart Tooltip */}
              <Tooltip title="Cart">
                <IconButton color="inherit" onClick={() => { navigate("/cart") }}>
                  <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "accentPurple.dark" } }}>
                    <ShoppingCartIcon fontSize='large' />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* Login/Logout Tooltip */}
          <Tooltip title={auth.id ? "Logout" : "Login"}>
            <IconButton
              color="inherit"
              aria-label={auth.id ? "Logout" : "Login"}
              onClick={() => auth.id ? logout() : navigate("/sign-in")}
            >
              {auth.id ? <LogoutIcon fontSize='large' /> : <LoginIcon fontSize='large' />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
