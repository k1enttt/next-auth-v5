"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { set } from "zod";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    // Thực hiện lưu cache hàm callback "() => console.log(token)"
    // React vẫn sẽ thực hiện cùng 1 hàm đã cache mỗi khi re-render nếu deps [token] không thay đổi
    const onSubmit = useCallback(() => {
        if (success || error) return;
        setError("");
        setSuccess("");

        if (!token) {
            setError("Missing token");
            return;
        }

        newVerification(token)
            .then((data) => {
                if (data.error) setError(data.error);
                if (data.success) setSuccess(data.success);
            })
            .catch(() => {
                setError("Something went wrong");
            });
    }, [token, success, error]);

    // Nếu hàm deps [onSubmit] thay đổi,
    // useEffect sẽ thực hiện lại hàm EffectCallback onSubmit()
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex items-center justify-center">
                {!success && !error && 
                    <BeatLoader color="#000" />
                }
                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    );
};
