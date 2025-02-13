import { Link, useNavigate } from "react-router-dom";
import { NavBar, PasswordInput } from "../../components";
import { useState, FormEvent } from "react";
import { validateEmail } from "../../utils/helper";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export function SignUp() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name) {
            setError('Por favor ingresa tu nombre.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Por favor ingresa un correo válido.');
            return;
        }
        if (!password) {
            setError('Por favor ingresa una contraseña.');
            return;
        }
        setError(null);

        try {

            const response = await axiosInstance.post('/create-account', { email, password, fullName: name });
            if (response.data && response.data.error) {
                toast.error(response.data.error);
                return;
            }
            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                setEmail('')
                setPassword('')
            } else {
                toast.error('Ups parece que algo ha ido bien en el servidor, intentalo mas tarde.');
            }
        }
    }

    return (
        <>
            <Toaster position="top-right" richColors />
            <NavBar userInfo={null} onSearchTasks={() => { }} handleClearSearch={() => { }} />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border border-gray-300 rounded  bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7">SignUp</h4>
                        <input type="text" placeholder="Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
                        <button type="submit" className="btn-primary">Crear Cuenta</button>

                        <p className="text-sm text-center mt-4">¡Ya tengo una cuenta! {''}
                            <Link to='/login' className="font-medium text-primary underline">Volver al Inicio</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
