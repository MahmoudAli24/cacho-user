import InputPhone from "@/components/sheared/inputPhone/InputPhone";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import ForgetHeader from "@/modules/forgetPasswordModule/components/forgetHeader/ForgetHeader";

const EnterPhoneNumber = ({onPhoneChange}) => {
    const [phone, setPhone] = useState({
        value: "", isValid: false
    });

    const handleContinue = () => {
        // Pass the phone number to the parent component
        onPhoneChange(phone.value, phone.isValid);
    };

    const handlePhoneChange = (value, isValid) => {
        setPhone({value, isValid});
    };

    return (<div className="flex flex-col gap-[34px] md:w-1/2 sm:w-2/3">
        <ForgetHeader/>
        <div>
            <InputPhone onPhoneChange={handlePhoneChange}/>
        </div>
        <div>
            <Button size="lg" isDisabled={!phone.isValid} className="bg-[--primary-color] text-white w-full"
                    onClick={handleContinue}>Continue</Button>
        </div>
    </div>);
}

export default EnterPhoneNumber;