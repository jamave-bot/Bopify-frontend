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

  
function SongRow({track="test"}) {
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
            <img className="songRow_album" src={track.album.images[0].url} alt=""  aria-describedby={id} onClick={handleClick}/>
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
                <Typography className={classes.typography}>{track.external_urls.spotify}</Typography>
            </Popover>
            <div className="songRow_info">
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(", ")} 
                    : 
                     {track.album.name}                
                </p>
                <p>
                </p>

            </div>



        </div>
    )
}

export default SongRow
