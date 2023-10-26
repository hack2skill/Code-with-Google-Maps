import { useState } from "react";
import {
    Flex,
    Heading,

    Stack,
    chakra,

    Avatar,
} from "@chakra-ui/react";
const Login = () => {

    const handleClick=async()=>{
        window.open(
			`http://localhost:8800/auth/google/callback`,
			"_self"
		);
    }
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Flex minW={{ base: "90%", md: "468px" }} justifyContent="center"
                    alignItems="center">
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className="btn-text" onClick={handleClick}><b>Sign in with google</b></p>
                    </div>
                </Flex>
            </Stack>
        </Flex>
    );
};

export default Login;
