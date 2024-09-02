// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// import { useState } from "react";
// import { register } from "../services/userService";

// export default function Registration() {

//   const handleCloseSnackBar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setSnackBarOpen(false);
//   };

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [snackSeverity, setSnackSeverity] = useState("info");
//   const [snackBarOpen, setSnackBarOpen] = useState(false);
//   const [snackBarMessage, setSnackBarMessage] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const data = {
//         username: username,
//         password: password,
//         firstName: firstname,
//         lastName: lastname,
//         email: email,
//       };

//       let response = await register(data);

//       console.log("Response body:", response.data);
//       setSnackSeverity("success");
//       setSnackBarMessage("Registration completed successfully!");
//       setSnackBarOpen(true);
//     } catch (error) {
//       const errorResponse = error.response.data;
//       setSnackSeverity("error");
//       setSnackBarMessage(errorResponse.message);
//       setSnackBarOpen(true);
//     }
//   };

//   return (
//     <>
//       <Snackbar
//         open={snackBarOpen}
//         onClose={handleCloseSnackBar}
//         autoHideDuration={6000}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackBar}
//           severity={snackSeverity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackBarMessage}
//         </Alert>
//       </Snackbar>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//         bgcolor={"#f0f2f5"}
//       >
//         <Card
//           sx={{
//             minWidth: 400,
//             maxWidth: 500,
//             boxShadow: 3,
//             borderRadius: 3,
//             padding: 4,
//           }}
//         >
//           <CardContent>
//             <Typography variant="h5" component="h1" gutterBottom>
//               Welcome, let's create an account
//             </Typography>
//             <Box
//               component="form"
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               width="100%"
//               onSubmit={handleSubmit}
//             >
//               <TextField
//                 label="Username"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//                <TextField
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 label="Firstname"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={firstname}
//                 onChange={(e) => setFirstname(e.target.value)}
//               />
//               <TextField
//                 label="Lastname"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={lastname}
//                 onChange={(e) => setLastname(e.target.value)}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 onClick={handleSubmit}
//                 fullWidth
//                 sx={{
//                   mt: "15px",
//                   mb: "25px",
//                 }}
//               >
//                 Register
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </>
//   );
// }
// pages/Register.js
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import profileService from "../services/profileService"; // update 08/22

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackType, setSnackType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const showError = (message) => {
    setSnackType("error");
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const showSuccess = (message) => {
    setSnackType("success");
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);


    if (!username || !email || !firstName || !lastName || !dob || !password) {
      showError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const userDetails = {
      username,
      email,
      firstName,
      lastName,
      dob,
      city,
      password,
    };

    try {
      await userService.registerUser(userDetails);
      showSuccess("Account created successfully");
      navigate("/login");
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={"#f0f2f5"}
      >
        <Card
          sx={{
            minWidth: 400,
            maxWidth: 500,
            boxShadow: 4,
            borderRadius: 4,
            padding: 4,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Create an Account
            </Typography>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                margin="normal"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: "15px",
                }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
