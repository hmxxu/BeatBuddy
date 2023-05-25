/**
 * This set of tests is intended to validate that certain utility functions
 * operate as intended to prevent front-facing visual errors from occurring.
 */

import { buildRgb, generateHoverColorHSL } from "./utils";

/**
 * Just a few general tests for conversions, varying the actual amounts
 */
describe('Tests for RGB to HSL conversions', () => {

    test('rgb(90, 40, 90), 0 sat, 0 light', () => {
        expect(generateHoverColorHSL({r: 90, g: 40, b: 90}, 0, 0))
            .toBe('hsl(300,38.5%,25.5%)');
    });

    test('rgb(100, 40, 100), 0 sat, 0 light', () => {
        expect(generateHoverColorHSL({r: 100, g: 40, b: 100}, 0, 0))
            .toBe('hsl(300,42.9%,27.5%)');
    });

    test('rgb(90, 40, 90), 10 sat, 0 light', () => {
        expect(generateHoverColorHSL({r: 90, g: 40, b: 90}, 10, 0))
            .toBe('hsl(300,48.5%,25.5%)');
    });

    test('rgb(100, 50, 100), 0 sat, 10 light', () => {
        expect(generateHoverColorHSL({r: 100, g: 40, b: 100}, 0, 10))
            .toBe('hsl(300,42.9%,37.5%)');
    });

    test('rgb(100, 50, 100), 10 sat, 10 light', () => {
        expect(generateHoverColorHSL({r: 100, g: 40, b: 100}, 10, 10))
            .toBe('hsl(300,52.9%,37.5%)');
    });

});

/**
 * Very small fake "images" are used (3 pixels) for tests here 
 */
describe('Tests for generating RGB from an image', () => {

    // our "image", should just be blank white
    let whiteImage: (number | undefined)[] = [
        255, 255, 255, undefined,
        255, 255, 255, undefined,
        255, 255, 255, undefined,
    ];
    let whiteImageData = {data: whiteImage};

    test('blank white image', () => {
        let whitePix = {r: 255, g: 255, b: 255};
        expect(buildRgb(whiteImageData))
            .toStrictEqual([whitePix, whitePix, whitePix]);
    });

    // another "image", should just be black
    let blackImage: (number | undefined)[] = [
        0, 0, 0, undefined,
        0, 0, 0, undefined,
        0, 0, 0, undefined,
    ];
    let blackImageData = {data: blackImage};

    test('solid black white', () => {
        let blackPix = {r: 0, g: 0, b: 0};
        expect(buildRgb(blackImageData))
            .toStrictEqual([blackPix, blackPix, blackPix]);
    });

});