import { getAccessToken } from "./APIWrapper";
import fetch from "node-fetch"

test('getAccessToken returns nullish object', async () => {
    let response = await getAccessToken();
    expect(typeof (response.access_token)).toBe('string')
})

export {}