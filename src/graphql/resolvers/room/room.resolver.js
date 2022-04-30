import { RoomCreate, RoomDelete, RoomUpdate } from './room.mutation';
import { ListRoom, RoomById } from './room.query';

export default {
    Mutation: {
        createNewRoom: RoomCreate.mutate.bind(RoomCreate),

        updateRoom: RoomUpdate.mutate.bind(RoomUpdate),

        deleteRoom: RoomDelete.mutate.bind(RoomDelete),
    },

    Query: {
        allRooms: ListRoom.query.bind(ListRoom),

        getRoomById: RoomById.query.bind(RoomById) ,
    },
};
