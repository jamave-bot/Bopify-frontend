import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Bopify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NewPlaylistForm(props) {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('')


    const handleChange = (e)=>{
        console.log(e.target.value)
        setName(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        fetch("https://bopify-api.herokuapp.com/playlists", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "authorization": localStorage.token
            },
            body: JSON.stringify({
              name: name,
              user_id: props.user.id
            })
        })
        .then(res => res.json())
        .then(newPlaylist =>{
            console.log("This is the playlist you just made: ", newPlaylist)
            if(newPlaylist.errors){
                alert(newPlaylist.errors.join(", "))
            }else{
                props.addPlaylist(newPlaylist)
                history.push(`/homepage`)
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

            <Typography component="h1" variant="h5">
            Add A Playlist!   
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Playlist Name" 
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
            />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Create Playlist
            </Button>

            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}