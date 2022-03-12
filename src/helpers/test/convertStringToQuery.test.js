import { convertToQuery } from "../convertStringToQuery";

test("test convert to query from string", () => {
    expect(convertToQuery("home", "1234")).toEqual({ home: "1234" });
});