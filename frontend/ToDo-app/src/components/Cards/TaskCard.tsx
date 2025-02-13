import dayjs from "dayjs"
import { MdCreate, MdDelete, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"


type Props = {
    title: string
    date: string
    content: string
    isCompleted?: boolean
    onEdit?: () => void,
    onDelete?: () => void
    onCompleteTask?: () => void

}

export function TaskCard({ title, date, content, isCompleted, onEdit, onDelete, onCompleteTask }: Props) {

    return (

        <div className="border border-gray-200 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between ">
                <div>
                    <h6 className={`text-sm font-medium ${isCompleted ? 'line-through' : ''}`}>{title}</h6>
                    <span className={`text-xs text-slate-500 ${isCompleted ? 'line-through' : ''}`}>{dayjs(date).format('D MMM YYYY')}</span>
                </div>
                {isCompleted ?
                    <MdCheckBox className={`icon-btn text-primary `} onClick={onCompleteTask} /> :
                    <MdCheckBoxOutlineBlank className={`icon-btn text-slate-300 hover:text-primary`} onClick={onCompleteTask} />}

            </div>
            <p className={`text-xs text-slate-600 mt-2 ${isCompleted ? 'line-through' : ''}`}>{content?.slice(0, 60)}</p>
            <div className="flex items-center justify-between mt-2">
                <span className={`flex items-center gap-2 text-xs  ${isCompleted ? ' text-green-500 bg-green-100 ' : 'text-slate-600 bg-slate-100'}  px-3 py-1 rounded`}>{isCompleted ? 'Completada' : 'Pendiente'}</span>
                <div className="flex items-center gap-2">
                    {!isCompleted && (<MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />)}
                    <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
                </div>
            </div>
        </div>

    )
}