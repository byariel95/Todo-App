import { RiStickyNoteAddFill } from "react-icons/ri"
import { TbMoodEmpty } from "react-icons/tb"

type Props = {
    message: string
    isSearch: boolean
}
export function EmptyCard({ message, isSearch }: Props) {

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {isSearch ?
                <TbMoodEmpty size={300} className="w-60  text-gray-300" /> :
                <RiStickyNoteAddFill size={300} className="w-60  text-gray-300" />}

            <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
        </div>

    )
} 