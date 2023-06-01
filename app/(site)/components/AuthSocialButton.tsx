import {IconType} from 'react-icons';

//the below interface describes the syntax of the props expected by the AuthSocialButton component
interface AuthSocialButtonProps {
    icon:IconType,
    onClick:()=>void;
}


//The React.FC<AuthSocialButtonProps> type annotation indicates that AuthSocialButton is a 
//functional component and specifies the type of its props as AuthSocialButtonProps
const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    //remap icon to Icon so that it can be used as a component
    icon:Icon,
    onClick
}) => {
    return(
        <button
        type="button" onClick={onClick} 
        className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
      ">
        <Icon/>
        </button>
    )
}

export default AuthSocialButton;