import { returnSongStats } from "./ReturnSongStats";
import { returnDummyRec } from "./ReturnSongStats";

test('testing returnSongStats', async () => {
    let response = await returnSongStats('5TTXEcfsYLh6fTarLaevTi');
    expect(typeof (response.name)).toBe('string')
})

test('testing returnSongStats', async () => {
    let response = await returnDummyRec('2kxP07DLgs4xlWz8YHlvfh');
    expect(response.tracks.length == 10)
})

export {}