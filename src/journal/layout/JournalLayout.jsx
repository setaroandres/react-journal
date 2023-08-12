import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components/';

export const JournalLayout = ({children}) => {

  //Este va a ser el width que le vamos a mandar a nuestro sidebar
  const drawerWidth = 240;

  return (
    //Box tbn es basicamente un div de Material UI
    <Box sx={{display: 'flex'}} className="animate__animated animate__fadeIn animate__faster">

      <NavBar drawerWidth={drawerWidth}/>
      <SideBar drawerWidth={drawerWidth} />

      <Box 
        component='main'
        sx={{flexGrow: 1, p: 3}}  
      >

        <Toolbar />

        {children}

      </Box>

    </Box>
  )
}
