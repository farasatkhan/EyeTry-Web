import * as React from 'react';
import {Link, Outlet} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AdbIcon from '@mui/icons-material/Adb';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { FaBold, FaSortDown } from "react-icons/fa";
import { red } from '@mui/material/colors';
import EmailSent from '../../pages/User/UserProfiling/EmailSent';
import Footer from './Footer';
import { FaGlasses } from "react-icons/fa";
import { logoutUser } from '../../api/authapi';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@mui/icons-material';
import { viewProfileImage } from '../../api/userapi';
import ellipse from '../../assets/images/UserProfiling/Ellipse.png'





// for navbar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const pages = ['Eyeglasses', 'Sunglasses', 'Categories', 'Brands', 'Assessments'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


// for sidebar
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // inside nav n side bars - main screen
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [profilePic,setProfilePic] = React.useState(null)
  const baseURL = 'http://localhost:3000'

  // getting name from local storage
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  
  // getting profile image
  React.useEffect( ()=>{

    const getImage = async () => {
      try{        
        const img = await viewProfileImage();
        setProfilePic(baseURL+img.location)
        }
      catch (e){
        if (e.response.status == 403){
          console.log('Refreshing Token Failed')
        }
        if (e.response.status == 400){
          console.log('No Image is present')
          setProfilePic(null)
        }
        // console.error(e) // annoying
        console.log(e)
      }
    }

    getImage();
  },[])

  const navigate = useNavigate();


  // for navbar
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (page) => {
    if (page == "Assessments"){
      navigate("/assessments/color_blind_test")
    }
    setAnchorElNav(null);

  };

  const logout = async () =>{
    await logoutUser()

  }
  const handleCloseUserMenu = (setting) => {
    if (setting == "Logout"){
      logout();
      navigate("/signin")
    }
    setAnchorElUser(null);
  };

  // for sidebar
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ color: "black", backgroundColor: "white", paddingRight: 20, paddingLeft: 20, display: "flex" }} open={open}>
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          {/* navbar */}

          
          {/* logo */}
          <FaGlasses size={30} sx={{ display: { xs: 'flex', sm: 'flex' }, mr: 1, ml: { xs: 0, sm: 2, md: 5, lg: 7, xl: 10 } }} />
          <Typography 
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <div style={{ fontWeight: "400", fontSize: "24px", marginLeft:10 }} ><span style={{ fontWeight: "800", fontSize: "24px" }}>EYE</span>TRY</div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}


            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FaSortDown />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>,

                <MenuItem>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <p>Messages</p>
                </MenuItem>,
                <MenuItem>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem>

              ))}
            </Menu>
          </Box>

          {/* pages brands , categories etc */}
          {/* Accessories are removed temporarly */}
          <Box sx={{ ml: 5, flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg:'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'black', display: 'flex', fontWeight: { md: '700', lg: '700' }, fontSize: { md: '12px', lg: '12px' } }}
              >
                {page}
              </Button>
            ))}
          </Box >

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
            <Search>
              <Search sx={{ flexGrow: 1 }} >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Search>
          </Box>
          
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0, ml: 2, }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profilePic} />
                <p className='text-sm ml-2 whitespace-nowrap'>Hi, Welcome<p className='font-black'>{firstName} {lastName}</p></p>
                <image alt="user-profile-pic" src={ellipse} width={50} height={50}  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 150, height: 150, borderRadius: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={profilePic} alt="user-profile-pic" className='rounded-full w-full h-full ' />
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 20 }}>{firstName} {lastName}</h2>
        </div>

        <Divider />

<List>
  {[
    { text: 'My Profile', path: '/user/profile' },
    { text: 'Personal Details', path: '/user/my_details' },
    { text: 'My Prescriptions', path: '/user/prescription_details' },
    { text: 'Address Book', path: '/user/add_address' },
    { text: 'Payment Methods', path: '/user/add_payment' },
    { text: 'Try On Images', path: '/user/upload_tryon_images' },
    { text: 'Manage Giftcards', path: '/user/giftcards' },
    { text: 'Log Out' , path: '/signin' }
  ].map(({ text, path }, index) => (
    <ListItem key={text} disablePadding>
      <ListItemButton
        component={Link}
        to={path}
        onClick={text === 'Log Out' ? logout : undefined}
      >
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>


      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
        <Footer/>
      </Main>
    </Box>
  );
}