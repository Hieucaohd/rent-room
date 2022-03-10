import { TestWatcher } from "jest";
import { createOptions } from "../createOptionsPaginator";

test("test create option for paginate", () => {
    expect(createOptions(3, 2)).toEqual({
        page: 3,
        limit: 2,
        customLabels: {
            meta: "paginator",
        },
    });

    expect(createOptions()).toEqual({
        page: 1,
        limit: 10,
        customLabels: {
            meta: "paginator",
        },
    });
});
