import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import useGitHubUsers from "../../hooks/use-github-users";
import { debounce } from "../../helpers";

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: users,
    total,
    loading,
    error,
  } = useGitHubUsers({ search, page: page + 1, perPage: rowsPerPage });

  const handleSearchUpdate = debounce((nextValue) => {
    setSearch(nextValue);
    setPage(0);
  }, 500);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (login) => {
    navigate(`/user/${login}`);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        GitHub Users
      </Typography>
      {error && (
        <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
          {error.message}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        onChange={(e) => handleSearchUpdate(e.target.value)}
        margin="normal"
      />
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          <TableContainer
            component={Paper}
            sx={{ mt: 2, maxHeight: 500, overflow: "auto" }}
          >
            <Table stickyHeader aria-label="user table" sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell>Profile URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!users.length
                  ? users.map((user) => (
                      <TableRow
                        key={user.id}
                        hover
                        onClick={() => handleRowClick(user.login)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <Avatar
                            src={user.avatar_url}
                            alt={user.login}
                            sx={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{user.login}</TableCell>
                        <TableCell>{user.html_url}</TableCell>
                      </TableRow>
                    ))
                  : !error && (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default Users;
