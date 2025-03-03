// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "react-activity/dist/Dots.css";
// import axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginForm = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     await axios({url:"https://frontend-test-api.aircall.io/auth/login", 
//       method: "POST",
//       data:{
//         username: username,
//         password: password,
//       },
//     })
//       .then((response) => {
//         sessionStorage.setItem(
//           "access_token",
//           response.data.access_token
//         );
//         navigate("/home");
//       })
//       .catch((error) => {
//         console.log(`Login Error : ${error}`);
//         // alert("Looks like you aren't connected to the internet!");
//       })
//       .finally(() => setIsLoading(false));
//   };

//   return isLoading ? (
//     <div className="center container">
//       <Dots />
//     </div>
//   ) : (
//     <div
//       className="center container"
//       style={{
//         maxWidth: "500px",
//         border: "2px solid gray",
//         borderRadius: "10px",
//         padding: "20px",
//         marginTop: "150px"
//       }}
//     >
//       <h3>Please login to proceed!</h3>
//       <form onSubmit={(e) => handleLoginForm(e)}>
//         <div className="input-field">
//           <input
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Dots } from "react-activity";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({loginUser}) {
  const classes = useStyles();
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



    const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios({url:"https://frontend-test-api.aircall.io/auth/login", 
      method: "POST",
      data:{
        username: username,
        password: password,
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "access_token",
          response.data.access_token
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log(`Login Error : ${error}`);
        // alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    isLoading ? (
          <div className="center container">
            <Dots />
          </div>
        ) : 
        (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e)=>{
              setUsername(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
          onClick={handleLoginForm}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid
            container
          >
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>)
  );
}

