import { convertToQuery, getCollection } from "../getListRelate";
import { Home } from "../../../models";

test("test convert to query from string", () => {
    expect(convertToQuery("home", "1234")).toEqual({ home: "1234" });
});

test("test find model by name", () => {
    expect(getCollection("homes")).toBe(Home);
});

test("test getCollection will throw err", () => {
    const run = () => {
        getCollection("notmodel");
    };

    expect(run).toThrowError(new Error("collection is not defined"));
});
