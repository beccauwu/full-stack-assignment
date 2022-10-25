import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { UserContext } from "context";
import React, { useContext, useRef, useState } from "react";
import { User } from "types";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};
const UserCreateModal: React.FC = () => {
  const { state, modalState } = useContext(UserContext);
  const [user, setUser] = useState<Omit<User, "id">>({ name: "", email: "" });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    state.create && state.create(user);
    setUser({ name: "", email: "" });
    modalState.setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <Modal
      open={modalState.open}
      aria-labelledby="-modal-title"
      onClose={() => modalState.setOpen(false)}
      closeAfterTransition
    >
      <Fade in={modalState.open}>
        <Box sx={style}>
          <Typography
            id="usercreate-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Create user
          </Typography>
          <Grid container direction="column">
            <Grid
              component="form"
              sx={{ mt: 1 }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                justifyContent="center"
                alignContent={{ xs: "center", sm: "flex-start" }}
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
              >
                <Grid>
                  <TextField
                    id="name"
                    ref={nameRef}
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    name="name"
                    required
                  />
                </Grid>
                <Grid>
                  <TextField
                    ref={emailRef}
                    id="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    name="email"
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                xs={12}
                gap={{ xs: 2, sm: 0 }}
                container
                paddingTop={2}
                justifyContent={{ xs: "center", sm: "space-between" }}
                alignItems="center"
              >
                <Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => modalState.setOpen(false)}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={state.loading}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserCreateModal;
