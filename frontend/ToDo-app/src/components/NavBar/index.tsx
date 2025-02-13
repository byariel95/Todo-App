
import { useNavigate } from "react-router-dom";
import { ProfileInfo } from "../Cards/ProfileInfo";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { IUser } from "../../interfaces/IUser";


type Props = {
    userInfo: IUser | null,
    onSearchTasks: (query: string) => void,
    handleClearSearch: () => void
}
export function NavBar({ userInfo, onSearchTasks, handleClearSearch }: Props) {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchTasks(searchQuery)
        };
    }

    const onClearSearch = () => {
        setSearchQuery('');
        handleClearSearch();
    }

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">ToDo-App</h2>
            {userInfo &&
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />}
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    )
}
