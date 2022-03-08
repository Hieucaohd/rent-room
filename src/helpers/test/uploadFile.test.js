import { generateFilename } from "../uploadFile";

test("generate filename from uuid", () => {
    let filename = "image.png";
    filename = generateFilename(filename);
    let filename1 = "image.png";
    filename1 = generateFilename(filename1);
    let filename2 = "image.png";
    filename2 = generateFilename(filename2);
    expect(filename).not.toBe(filename1);
    expect(filename).not.toBe(filename2);
    expect(filename1).not.toBe(filename2);
});
