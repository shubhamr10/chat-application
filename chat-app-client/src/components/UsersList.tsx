import type { User, UserPresence } from "../types";
import styles from "../assets/styles/UserList.component.module.css";

interface UserListProps {
    users: UserPresence[];
    onlineCount:number;
    selectedUser:User;
    handleUserClick:(user:UserPresence) => void;
}

function UserList({ users, onlineCount, selectedUser, handleUserClick }: UserListProps){
    return (
        <div className={styles.container} style={{padding:"20px"}}>
            <header className={`${styles.header} poppins-medium`}>
                Online Users &nbsp;<span>({onlineCount})</span>
            </header>
            <hr className={styles.ruler} />
            <ul className={styles.usersList}>
                {/* {
                    users.map((user) => (<li key={user.id}>{user.username}</li>))
                } */}
                {users.map((user:UserPresence) => {
                    const isSelected = user.id === selectedUser.id;
                    const onlineState = user.is_online ? 'online' : 'offline';
                return (
                    <li
                        key={user.id}
                        className={`${styles.user_item} ${isSelected ? styles.selected : ''}`}
                        onClick={() => handleUserClick(user)}
                    >
                        {/* Avatar */}
                        <div className={styles.avatar_wrapper}>
                            <div className={`${styles.avatar_img} poppins-bold`}>{user.username.charAt(0).toLocaleUpperCase()}</div>
                        </div>

                        {/* Details */}
                        <div className={styles.user_info}>
                        <span className={styles.username}>{user.username}</span>
                        <div className={styles.status_container}>
                            <span className={`${styles.status_dot} ${styles[onlineState]}`} />
                            <span className={styles.status_text}>{onlineState}</span>
                        </div>
                        </div>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default UserList;