import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
              {user.username}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={logout}
              sx={{ color: "white", borderColor: "white" }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </header>
  );
}

export default Header;
