import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (<div className="w-full flex gap-x-4 items-center">
    <Button 
    size="lg"
    className="w-full"
    variant='outline'
    onClick={() => {}}>
      <FcGoogle className="w-6 h-6" />
    </Button>
    <Button 
    size="lg"
    className="w-full"
    variant='outline'
    onClick={() => {}}>
      <FaGithub className="w-6 h-6" />
    </Button>
  </div>);
};
