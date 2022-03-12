import { getModel } from "../getModelByCollectionName";
import { Home, Room, User } from "../../models";

test("test find model by name", () => {
    expect(getModel("homes")).toBe(Home);
    expect(getModel("users")).toBe(User);
    expect(getModel("rooms")).toBe(Room);
});

test("test getCollection will throw err", () => {
    const run = () => {
        getModel("notmodel");
    };

    expect(run).toThrowError(new Error("collection is not defined"));
});
