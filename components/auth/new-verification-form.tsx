'use client';
import { CardWrapper } from "./card-wrapper";
import {BeatLoader} from "react-spinners";

export const NewVerificationForm = () => {
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex items-center justify-center">
                <BeatLoader color="#000" />
            </div>
        </CardWrapper>

    );
}