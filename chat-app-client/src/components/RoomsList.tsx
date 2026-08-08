import type { Room } from "../types";
import styles from "../assets/styles/RoomsList.component.module.css";

interface RoomListsProps {
    rooms:Room[],
    onRoomSelect:(room:Room)=>void,
    activeRoom:Room
}

function RoomList({rooms, onRoomSelect, activeRoom}:RoomListsProps ){
    return (
        <div className={styles.RoomsListContainer}>
            <div className={styles.input_group}>
                <svg className={styles.input_icon} width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z" fill="currentColor"/>
                </svg>

                <input type="text" id="search" name="search" className={styles.custom_input} placeholder="Search chat room" />
            </div>
            <hr className={styles.ruler} />
            <ul className={styles.room_list}>
                {rooms.map((room) => {
                    const isSelected = room.id === activeRoom.id;
                    return (
                    <li
                        key={room.id}
                        className={`${styles.room_item} ${isSelected ? styles.selected : ''}`}
                        onClick={() => onRoomSelect(room)}
                    >
                        <div className={styles.avatar_wrapper}>
                            {/* <img alt={room.name} className={styles.avatar_img} /> */}
                            <div className={`${styles.avatar_img} poppins-bold`}>{room.name.charAt(0).toLocaleUpperCase()}</div>
                            <span className={styles.status_badge} />
                        </div>

                        <div className={styles.room_info}>
                            <span className={styles.room_name}>#{room.name}</span>
                            <span className={styles.room_count}>{4}</span>
                        </div>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default RoomList;