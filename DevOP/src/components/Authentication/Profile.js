import { useContext, useEffect, useState } from "react";
import { Dropdown, ButtonGroup, NavLink } from "react-bootstrap";
import { db } from "../../utils/firebase";
import { AuthContext } from "./AuthProvider";
import { Avatar } from "@chakra-ui/react";

const Profile = () => {
    const [userData, setUserData] = useState([]);
    const { user, logout } = useContext(AuthContext);
    useEffect(() => {
        const arr = [];
        db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const res = {
                        id: doc.id,
                        data: doc.data(),
                    }
                    arr.push(res)
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setUserData(arr)
            })
    }, [user])

    return (
        <>
            <Dropdown as={ButtonGroup} align={{ lg: 'end' }}>
                {/* <Avatar name={userData[0].data.name} size='sm' bg="blue.500" /> */}
                {userData?.map((item, key) => (
                    <div key={key} style={{ display: "flex" }}>
                        <Avatar name={item.data.name} size='sm' bg="blue.500" />
                        <Dropdown.Toggle as={NavLink} split variant="success" id="dropdown-split-basic" />
                        <Dropdown.Menu key={key} style={{ padding: 0, textAlign: "center" }}>
                            <Dropdown.ItemText >{item.data.name}</Dropdown.ItemText>
                            <Dropdown.ItemText >{item.data.email}</Dropdown.ItemText>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => {
                                logout();
                            }} >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </div>
                ))}
            </Dropdown>
        </>
    );
};

export default Profile