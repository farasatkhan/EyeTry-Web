import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
import logo from '../../assets/images/Logo/logo.png'
import { FaCartShopping } from "react-icons/fa6";
import Hidden from '@mui/material/Hidden';
import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getUserData } from '../../api/userapi';
import { viewProductsList } from '../../api/productsApi';
import { useSelector } from "react-redux";
import { BiSupport } from "react-icons/bi";

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



const pages = ['Eyeglasses', 'Sunglasses', 'Vision Assessments'];
const settings = ['Profile', 'Your Orders', 'Logout'];


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

// navlinks
export const navbarLinks = [
  {
      name: 'eyeglasses',
  },
  {
      name: 'sunglasses',

  },
  {
      name: 'visionAssessments',

  },
];



export default function PersistentDrawerLeft() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // products list 
  const [productsList, setPrductsList] = useState([])

  const cartItemsLength = useSelector((state) => state.cartItemsNumber);
  const cartItems = cartItemsLength.cartItemsNumber;

  useEffect(() => {
    const getUserName = async () => {
      const { firstName, lastName } = await getUserData();
      // Update the state with user data
      setFirstName(firstName);
      setLastName(lastName);
    };
    getUserName();
  }, []);

  const handleNavigate = (page) => {
    navigate(page)
  }

  // Fetching product list for search data 

  useEffect(() => {
    fetchProductsList();
  }, [])

  const fetchProductsList = async () => {
    try {
      const products = await viewProductsList();
      const simplifiedProducts = products.map(product => ({
        id: product._id,
        name: product.name
      }));
      setPrductsList(simplifiedProducts)
      // console.log("fetched product list: ", simplifiedProducts)
    } catch (error) {
      console.log(error)
    }
  }

  // handling navigation on search options
  const handleSearchOptionClick = (event, value) => {
    if (value.id === undefined) {
      alert("No Results Found!")
    }
    if (value && value.id !== undefined) {
      // console.log("value :" ,value)
      navigate(`/product_details/${value.id}`);
    }
  };


  const [profilePic, setProfilePic] = React.useState(null)
  const baseURL = 'http://localhost:3000'

  // getting name from local storage
  // const firstName = localStorage.getItem("firstName")
  // const lastName = localStorage.getItem("lastName")

  // getting profile image
  React.useEffect(() => {

    const getImage = async () => {
      try {
        const img = await viewProfileImage();
        setProfilePic(baseURL + img.location)
      }
      catch (e) {
        if (e.response.status == 403) {
          console.log('Refreshing Token Failed')
        }
        if (e.response.status == 400) {
          console.log('No Image is present')
          setProfilePic(null)
        }
        // console.error(e) // annoying
        console.log(e)
      }
    }

    getImage();
  }, [])

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
    if (page == "Vision Assessments") {
      navigate("/assessments/color_blind_test")
    }
    else if (page == "Eyeglasses") {
      navigate("/products/Eyeglasses")
    }
    else if (page == "Sunglasses") {
      navigate("/products/Sunglasses")
    }
    setAnchorElNav(null);

  };

  const logout = async () => {
    await logoutUser()

  }
  const handleCloseUserMenu = (setting) => {
    if (setting == "Logout") {
      logout();
      navigate("/signin")
    }
    else if (setting == "Profile") {
      navigate("/user/profile")
    }
    else if (setting == "Your Orders") {
      navigate("/track_orders")
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

  // handling navlinks dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='pl-0 pr-0 md:pr-5 md:pl-5 lg:pr-10 lg:pl-10' position="fixed" style={{ color: "black", backgroundColor: "white", display: "flex" }} open={open}>
        <Toolbar sx={{ flexGrow: 1 }}>
          <div>
            {/* Display the IconButton only on small screens */}
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>

          {/* logo */}
          {/* <FaGlasses size={30} sx={{ display: { xs: 'flex', sm: 'flex' }, mr: 1, ml: { xs: 0, sm: 2, md: 5, lg: 7, xl: 10 } }} /> */}
          {/* <Typography 
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
          >/
          </Typography> */}

          {/* Logo */}
          <div onClick={() => handleNavigate('/')} className='flex items-center cursor-pointer hidden sm:flex sm:block'>
            <img className='w-[40px] h-[26px]' src={logo} alt="Logo" />
            <div style={{ fontWeight: "400", fontSize: "22px", marginLeft: 10, fontFamily: 'sans-serif' }} >
              <span style={{ fontWeight: "700", fontSize: "22px", fontFamily: 'sans-serif' }}>EYE</span>TRY</div>
          </div>



          {/* pages brands , categories etc */}
          <div>
      <Hidden mdDown>
        <Box
          className="whitespace-nowrap"
          sx={{ ml: 5, flexGrow: 1, display: 'flex' }}
          onMouseLeave={handleClose} // Close options menu on mouse leave
        >
          {pages.map((page) => (
            <React.Fragment key={page}>
              <Button
                onMouseEnter={handleClick}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'flex',
                  fontWeight: { md: '700', lg: '700' },
                  fontSize: { md: '12px', lg: '12px' },
                }}
              >
                {page}
              </Button>
            </React.Fragment>
          ))}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            elevation={1}
          >
            {/* Add your dropdown items here */}
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </Box>
      </Hidden>
    </div>

          <Autocomplete
            className='w-[200px] mr-auto ml-5'
            size='small'
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={productsList}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={handleSearchOptionClick}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search...'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <SearchIcon
                      style={{ marginRight: '8px', color: 'black' }}
                    />
                  ),
                  sx: {
                    border: 'none',
                  },
                }}
              />
            )}
          />


          <div className='ml-auto flex'>
            <IconButton onClick={() => navigate('cart')} size="large" aria-label="cart items 4" color="inherit">
              <Badge badgeContent={cartItems} color="error">
                <FaCartShopping className='h-[22px] w-[22px]' />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label=""
              color="inherit"
              onClick={() => navigate('/support')}
            >
              <Badge badgeContent={null} color="error">
              <BiSupport  className='h-[22px] w-[22px]'  />
              </Badge>
            </IconButton>
            <Box sx={{ flexGrow: 0, ml: 2, }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profilePic} />
                  <p className='text-sm ml-2 whitespace-nowrap hidden sm:inline-block'>Hi, Welcome<p className='font-black'>{firstName} {lastName}</p></p>
                  <image alt="user-profile-pic" src={ellipse} width={50} height={50} />
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
          </div>
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

        {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 150, height: 150, borderRadius: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={profilePic} alt="user-profile-pic" className='rounded-full w-full h-full ' />
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 20 }}>{firstName} {lastName}</h2>
        </div> */}

        <Divider />

        <List>
          {[
            { text: 'Eyeglasses', path: '/products/Eyeglasses' },
            { text: 'Sunglasses', path: '/products/Sunglasses' },
            { text: 'Categories', path: '/products/Categories' },
            { text: 'Track Your Orders', path: '/track_orders' },
            { text: 'Vission Assessments', path: '/assessments/color_blind_test' },
            { text: 'Log Out', path: '/signin' }
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
      <Main open={open} className="flex flex-col min-h-screen">
        <DrawerHeader />
        <div className="flex-1 bg-gray-50">
          <Outlet />
        </div>
        <Footer />
      </Main>
    </Box>
  );
}