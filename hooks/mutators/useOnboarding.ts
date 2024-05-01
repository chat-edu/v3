import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import {createUser} from "@/services/api/user";


const useOnboarding = () => {

    const toast = useToast();

    const { user } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

    const randomizeProfilePicture = () => {
        const randomNum = Math.floor(Math.random() * 1000000);
        setProfilePictureUrl(`https://api.multiavatar.com/${randomNum}.png`);
    }

    const onSubmit = async () => {
        if(!user || !username || !profilePictureUrl) return;
        const success = await createUser({
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            username,
            profile_picture_url: profilePictureUrl
        });
        if(success) {
            toast({
                title: "Account created!",
                description: "Your account has been created successfully",
                status: "success",
                duration: 5000,
                isClosable: true
            });
        } else {
            toast({
                title: "Account creation failed",
                description: "An error occurred while creating your account",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    }


    return {
        username,
        setUsername,
        profilePictureUrl,
        randomizeProfilePicture,
        isDisabled: !username || !profilePictureUrl || !user,
        onSubmit
    }
}

export default useOnboarding;