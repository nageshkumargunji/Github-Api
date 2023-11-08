import { useState } from "react";

import axios from "axios";
import {
  VStack,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  Box,
  Image,
  Container,
  Center,
} from "@chakra-ui/react";


function User() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);



  const show = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not Found");
      } else {
        setError("Error occurred when data fetching");
      }
    }
  };



  return (
    <Container p="4" maxW="lg" centerContent>
      <VStack spacing={4} alignItems="flex-start">
      
        
          <div>
            <h1>Search Name On GitHub</h1><br/>
            <form onSubmit={show}>
              <Input
                type="text"
                placeholder="Enter the GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br/>
              <Button colorScheme="teal" type="submit">
                Search
              </Button>
            </form>
          </div>
        
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {userData && (
          <Box borderWidth="1px" borderRadius="lg" p="4" w="100%">
            <Center>
              <Image
                src={userData.avatar_url}
                alt="User Avatar"
                boxSize="100px"
                objectFit="cover"
                borderRadius="full"
              />
            </Center>
            <Text fontWeight="bold" fontSize="lg">
              Username: {userData.login}
            </Text>
            <Text fontWeight="bold">Name: {userData.name || "Not provided"}</Text>
            <Text fontWeight="bold">Public Repos: {userData.public_repos}</Text>
            <Text fontWeight="bold">Public Gists: {userData.public_gists}</Text>
            <Text fontWeight="bold">
              Profile Created At: {new Date(userData.created_at).toLocaleDateString()}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default User;
