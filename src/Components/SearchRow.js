import React from 'react'
import "../CSS/SongRow.css"
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

  
function SearchRow({video="test"}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div className="songRow"  >
            <img className="songRow_album" src={video.snippet.thumbnails.default.url} alt=""  aria-describedby={id} onClick={handleClick}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>https://youtu.be/{video.id.videoId}</Typography>
            </Popover>
            <div className="songRow_info">
                <h1>{video.snippet.title}</h1>
                <p>
                    {video.snippet.channelTitle}
                </p>
            </div>



        </div>
    )
}

export default SearchRow
