import { hasObjPermission as hasRoomObjPermission } from "./roomPermission";
import { hasObjPermission as hasHomeObjPermission } from "./homePermission";

export const hasObjectPermission = async (collectionName, id, user) => {
    let hasObjPermission;
    if (collectionName === "rooms") {
        hasObjPermission = hasRoomObjPermission;
    } else if (collectionName === "homes") {
        hasObjPermission = hasHomeObjPermission;
    }

    return await hasObjPermission(id, user);
};
