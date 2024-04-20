import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    return (
    <CardWrapper
        headerLabel="Oops, something went wrong!!"
        backButtonLabel="Back to home"
        backButtonHref="/auth/login"  
    >
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-destructive" />
        </div>
    </CardWrapper>)   
};