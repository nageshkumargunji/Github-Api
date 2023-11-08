
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import User from './Components/User';
function App() {
  return (
      <ChakraProvider><User/></ChakraProvider>
     

  );
}

export default App;
