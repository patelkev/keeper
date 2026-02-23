import React, { useState } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    logout();
  };

  const initial = user?.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              onClick={handleOpen}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                padding: "6px 12px",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                transition: "background-color 0.2s",
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "rgba(255,255,255,0.3)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                {initial}
              </Avatar>
            </Box>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 8,
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: 2,
                  "& .MuiMenuItem-root": { px: 2, py: 1.25 },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Signed in as
                </Typography>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {user.username}
                </Typography>
                {user.email && (
                  <Typography variant="caption" color="text.secondary" noWrap display="block">
                    {user.email}
                  </Typography>
                )}
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </header>
  );
}

export default Header;
