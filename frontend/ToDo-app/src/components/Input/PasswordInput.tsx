import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export function PasswordInput({ value, onChange, placeholder }: Props) {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    return (
        <div className="flex items-center bg-transparent border-[1.5px] border-gray-300 px-5 rounded mb-3">
            <input
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                value={value}
                onChange={onChange}
                className="w-full text-sm bg-transparent py-3  mr-3 rounded outline-none"
            />

            {isShowPassword ? <FaRegEye size={22}
                className='text-primary cursor-pointer'
                onClick={toggleShowPassword}
            /> : <FaRegEyeSlash size={22}
                className='text-slate-400 cursor-pointer'
                onClick={toggleShowPassword}
            />}

        </div>
    )
}
