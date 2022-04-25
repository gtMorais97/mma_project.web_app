import { getLastName } from "../lib/htmlFillers";

test("correctly gets the last name", () => {
    expect(getLastName("Max Holloway")).toBe("Holloway")
    expect(getLastName("Khalil Roundtree Jr.")).toBe("Roundtree")
})



