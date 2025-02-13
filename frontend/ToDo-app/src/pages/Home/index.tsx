import { MdAdd, MdDelete, MdEditSquare } from "react-icons/md";
import { EmptyCard, NavBar, TaskCard } from "../../components";
import { AddEditTasks } from "./AddEditTasks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal'
import axiosInstance from "../../utils/axiosInstance";
import { IUser } from "../../interfaces/IUser";
import { toast, Toaster } from "sonner";

export function Home() {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: 'add',
        data: null
    });

    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [allTasks, setAllTasks] = useState<any>([]);
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate()

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    }
    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get('/get-all-task');
            if (response.data && response.data.tasks) {
                setAllTasks(response.data.tasks);
            }
        } catch (error: any) {
            console.log("🚀 ~ getAllTasks ~ error:", error)
        }
    }

    const handleEditTask = async (taskDetails: any) => {
        setOpenAddEditModal({
            isShow: true,
            type: 'edit',
            data: taskDetails
        })
    }

    const handleDeleteTask = async (taskDetails: any) => {
        const taskId = taskDetails._id
        try {
            const response = await axiosInstance.delete('/delete-task/' + taskId);
            if (response.data && !response.data.error) {
                toast.success('Tarea eliminada correctamente!', {
                    icon: <MdDelete />
                })
                getAllTasks();
            }
        } catch (error: any) {
            console.log("🚀 ~ handleDeleteTask ~ error:", error)
        }
    }

    const onSearchTasks = async (query: string) => {
        try {
            const response = await axiosInstance.get('/search-tasks', { params: { query } });
            if (response.data && response.data.tasks) {
                setIsSearch(true);
                setAllTasks(response.data.tasks);
            }
        } catch (error: any) {
            console.log("🚀 ~ onSearchTask ~ error:", error)
        }
    }

    const updateCompleteTask = async (taskDetails: any) => {
        const taskId = taskDetails._id
        try {
            const response = await axiosInstance.put('/update-task-completed/' + taskId, { isCompleted: !taskDetails.isCompleted });
            if (response.data && response.data.task) {
                toast.success('Se ha actualizado la tarea correctamente!', {
                    icon: <MdEditSquare />
                })
                getAllTasks();
            }
        } catch (error: any) {
            console.log("🚀 ~ updateCompleteTask ~ error:", error)
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllTasks();
    }

    useEffect(() => {
        getUserInfo();
        getAllTasks();
        return () => { }
    }, []);

    return (
        <>
            <Toaster position="top-right" />
            <NavBar userInfo={userInfo} onSearchTasks={onSearchTasks} handleClearSearch={handleClearSearch} />
            <div className="container mx-auto">
                {allTasks.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        {allTasks.map((task: any) => (
                            <TaskCard
                                key={task._id}
                                title={task.title}
                                date={task.createdOn}
                                content={task.content}
                                isCompleted={task.isCompleted}
                                onEdit={() => handleEditTask(task)}
                                onDelete={() => handleDeleteTask(task)}
                                onCompleteTask={() => updateCompleteTask(task)}
                            />))}

                    </div>
                ) : (
                    <EmptyCard isSearch={isSearch} message={isSearch ? 'Oops! No se encontraron tareas' : `Empieza a crear tu primera tarea Haz clic en el botón añadir para apuntar ideas y recordatorios empecemos! 🚀`} />
                )}

            </div>
            <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => { setOpenAddEditModal({ isShow: true, type: 'add', data: null }) }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                }}
                contentLabel=""
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto'
            >
                <AddEditTasks
                    onClose={() => {
                        setOpenAddEditModal({ isShow: false, type: 'add', data: null })
                    }}
                    type={openAddEditModal.type}
                    taskData={openAddEditModal.data}
                    getAllTasks={getAllTasks}
                />
            </Modal>
        </>
    )
}
