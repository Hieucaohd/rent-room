import { RoomCreate, RoomCreateWithHome, RoomDelete, RoomUpdate } from './room.mutation';
import { ListRoom, ListRoomByIds, RoomById } from './room.query';

export default {
    Mutation: {
        createNewRoom: RoomCreate.mutate.bind(RoomCreate),

        updateRoom: RoomUpdate.mutate.bind(RoomUpdate),

        deleteRoom: RoomDelete.mutate.bind(RoomDelete),

        createNewRoomWithHome: RoomCreateWithHome.mutate.bind(RoomCreateWithHome),
    },

    Query: {
        allRooms: ListRoom.query.bind(ListRoom),

        getRoomById: RoomById.query.bind(RoomById),
        getListRoomByIds: ListRoomByIds.query.bind(ListRoomByIds),
    },
};
