import { useState } from "react"
import { MdCheckCircle, MdClose, MdEditSquare } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";


type Props = {
    onClose: () => void;
    type: string;
    taskData: any | null;
    getAllTasks: () => void;
}
export function AddEditTasks({ onClose, type, taskData, getAllTasks }: Props) {
    const [title, setTitle] = useState<string>(taskData?.title || '');
    const [content, setContent] = useState<string>(taskData?.content || '');
    const [error, setError] = useState<null | string>(null);


    const addNewTask = async () => {
        try {
            const response = await axiosInstance.post('/add-task', { title, content });
            if (response.data && response.data.task) {
                toast.success('Tarea agregada correctamente!', {
                    icon: <MdCheckCircle />
                })
                getAllTasks();
                onClose();
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('error.response.data.message');
            }
        }
    }
    const editTask = async () => {
        const taskId = taskData._id
        try {
            const response = await axiosInstance.put('/edit-task/' + taskId, { title, content });
            if (response.data && response.data.task) {
                toast.success('Se ha actualizado la tarea correctamente!', {
                    icon: <MdEditSquare />
                })
                getAllTasks();
                onClose();
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('error.response.data.message');
            }
        }
    }

    const handleAddTask = () => {
        if (!title) {
            setError('Por favor ingrese un título');
            return;
        }
        if (!content) {
            setError('Por favor ingrese una descripción');
            return;
        }
        if (type === 'edit') {
            editTask();
        } else {
            addNewTask();
        }
    }

    return (
        <div className="relative">

            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2 ">
                <label className="input-label" htmlFor="">Título</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Titulo de la tarea"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label" htmlFor="">Descripción</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Descripcion de la tarea"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-5 p-3">{error}</p>}
            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddTask}>{type === 'edit' ? 'Editar' : 'Agregar'}</button>
        </div>

    )
}
