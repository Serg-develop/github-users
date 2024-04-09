import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Grid,
  Link,
  Avatar,
  Box,
  Chip,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import RepositoriesIcon from "@mui/icons-material/Source";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useGitHubUserDetails from "../../hooks/use-github-user-detail";
import { formatCount } from "../../helpers";

const UserDetails = () => {
  const { login } = useParams();
  const navigate = useNavigate();
  const { data: user, loading, error } = useGitHubUserDetails(login);

  // Adjust here for consistency
  if (loading)
    return (
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
    );

  if (error)
    return (
      <Typography sx={{ margin: 2, textAlign: "center" }}>
        Error: {error.message}
      </Typography>
    );

  return (
    <Card
      sx={{ maxWidth: 600, margin: "auto", padding: 3, borderRadius: 3, mt: 3 }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Avatar
            alt={user?.name || "Avatar"}
            src={user?.avatar_url}
            sx={{ width: 120, height: 120, margin: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography gutterBottom variant="h4">
            {user?.name || "No Name Provided"}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            @{login}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user?.bio || "No Bio Available"}
          </Typography>
          <Link
            href={user?.html_url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <GitHubIcon /> GitHub Profile
          </Link>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            {user?.location && (
              <Chip
                icon={<LocationOnIcon />}
                label={user.location}
                variant="outlined"
              />
            )}
            {user?.company && (
              <Chip
                icon={<BusinessIcon />}
                label={user.company}
                variant="outlined"
              />
            )}
          </Stack>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <GroupIcon fontSize="medium" />
              {`${formatCount(user?.followers)} Followers`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <GroupIcon fontSize="medium" />
              {`${formatCount(user?.following)} Following`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <RepositoriesIcon fontSize="medium" />
              {`${formatCount(user?.public_repos)} Repositories`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserDetails;
