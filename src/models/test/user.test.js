const { MongoClient } = require("mongodb");

describe("insert", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    it("should insert a doc into collection", async () => {
        const users = db.collection("useras");

        const mockUser = { _id: "1234", fullname: "John", role: ["ADMIN"] };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ '_id': "1234" });
        expect(insertedUser).toEqual(mockUser);
    });
});
