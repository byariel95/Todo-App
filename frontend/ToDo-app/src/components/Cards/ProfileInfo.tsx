import { IUser } from "../../interfaces/IUser";
import { getInitials } from "../../utils/helper";

type Props = {
    onLogout: () => void
    userInfo: IUser | null
}

export function ProfileInfo({ onLogout, userInfo }: Props) {
    if (!userInfo) {
        return null;
    }

    return (

        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials(userInfo.fullName)}
            </div>
            <div>
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                    Salir
                </button>
            </div>
        </div>

    )
}