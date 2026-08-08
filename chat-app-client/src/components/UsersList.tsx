import type { User } from "../types";

interface UserListProps {
    users: User[];
}

function UserList({ users }: UserListProps){
    return (
        <div style={{padding:"20px"}}>
            <h3>Online Users</h3>
            <ul style={{listStyleType:"none"}}>
                {
                    users.map((user) => (<li key={user.id}>{user.username}</li>))
                }
            </ul>
        </div>
    )
}

export default UserList;