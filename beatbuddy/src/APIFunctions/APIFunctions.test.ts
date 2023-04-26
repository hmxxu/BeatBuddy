import { returnSongStats } from "./ReturnSongStats";
import { ReturnDummyRec } from "./ReturnSongStats";

test('testing returnSongStats', async () => {
    let response = await returnSongStats('5TTXEcfsYLh6fTarLaevTi');
    expect(typeof (response.name)).toBe('string')
})

test('testing returnSongStats', async () => {
    let response = await ReturnDummyRec('2kxP07DLgs4xlWz8YHlvfh');
    expect(response.tracks.length == 10)
})

export {}