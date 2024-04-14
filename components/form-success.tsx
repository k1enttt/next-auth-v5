import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({ message } : FormSuccessProps) => {
if (!message) return null;
return (
<div className="bg-emerald-500/15 rounded-md flex gap-x-2 items-center p-3 text-sm text-emerald-500">
    <CheckCircledIcon className="h-4 w-4" />
    <p>{message}</p>
</div>

);
}