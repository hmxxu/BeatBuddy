import { getAccessToken } from "./recommendAlgo";

test('getAccessToken returns nullish object', async () => {
    let response = await getAccessToken();
    expect(typeof (response.access_token)).toBe('string')
})

export {}