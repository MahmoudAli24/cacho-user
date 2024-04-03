import {useState} from "react";
import {useRouter} from "next/router";
import {deleteCookie, getCookie} from "cookies-next";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure, User} from "@nextui-org/react";
import {LogoutIcon} from "@/utilis/Icons/LogoutIcon";
import EditProfile from "@/modules/layout/navBar/components/userInfo/EditProfile";
import ChangePassword from "@/modules/layout/navBar/components/userInfo/ChangePassword";
import ChangeLocation from "@/modules/layout/navBar/components/userInfo/ChangeLocation";
import UserModal from "@/modules/modalsModule/UserModal";
import UserImageDefault from "../../../../../../public/userImageDefult.svg";

const UserInfo = ({name, image ,userLocation:firstLocation}) => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalContent, setModalContent] = useState(null);
    const [userLocation, setUserLocation] = useState("");


    const handleActionClick = (action) => {
        setModalContent(action);
        onOpen();
    };

    const handelLogout = async () => {
        const tokenData = getCookie('token')
        try {
            const response = await fetch('https://caco-dev.mimusoft.com/api/customer/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData}`
                },
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            deleteCookie("token");
            router.reload()
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <>
            <Dropdown placement="bottom-start" aria-label="User Info">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                        className="transition-transform"
                        description={userLocation.split(",")[0] || firstLocation.split(",")[0]}
                        name={`Hi, ${name}`}
                        classNames={{
                            description: "text-[14px] font-medium text-[--primary-color]",
                            name: "text-[12px] font-[400] text-[--gray-2]",
                        }}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="Edit Profile">
                        <EditProfile onClick={
                            () => handleActionClick("Edit Profile")
                        }/>
                    </DropdownItem>
                    <DropdownItem key="Change Password">
                        <ChangePassword onClick={
                            () => handleActionClick("Change Password")
                        }/>
                    </DropdownItem>
                    <DropdownItem key="Change location">
                        <ChangeLocation onClick={
                            () => handleActionClick("Change Location")
                        }/>
                    </DropdownItem>
                    <DropdownItem onClick={handelLogout} key="logout" color="danger">
                        <div className="flex items-center justify-start gap-2">
                            <span><LogoutIcon/></span>
                            <span>Logout</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <UserModal isOpen={isOpen} onOpenChange={onOpenChange} modalContent={modalContent} passLocation={
                (location) => setUserLocation(location)
            }/>
        </>
    );
}

export default UserInfo;