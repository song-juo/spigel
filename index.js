const sharp = require("sharp");
const bigInt = require("big-integer");
const fs = require("fs");

/* This code implements the "dHash" algorithm described in: https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html */

/**
 *
 * @param imagePath => EXTERNAL >> First image (buffer or path string)
 * @param imagePath2 => EXTERNAL >> Second image (buffer or path string)
 * @returns {Promise<*[boolean]>} =>
 * @private
 */
async function _difference (imagePath) {

    const baseWidth = 9
    const baseHeight = 8
    const baseBuffer = fs.readFileSync(imagePath)

    const treatedImage = await sharp(baseBuffer)
        .resize(baseWidth, baseHeight) // 9x8 = 72 pixels
        .grayscale()
        .raw()
        .toBuffer()

    const pixels = new Int32Array(treatedImage)
    let difference = [];

    for (let i = 0; i < baseHeight; i++) {
        let startRow = i * baseWidth
        for (let j = 0; j < baseWidth - 1; j++) {
            let left_pixel_index = startRow + j
            difference.push(pixels[left_pixel_index] > pixels[left_pixel_index + 1])
        }
    }

    return difference
}

/**
 *
 * @param imagePath => Path to an image
 * @returns {Promise<string>} => Returns the hash text for the image
 */
async function calcHash(imagePath) {
    const difference = await _difference(imagePath)

    let decimalValue = 0
    let hashString = ""

    for (const [index, value] of difference.entries()) {
        if (value) {
            decimalValue += value * (2 ** (index % 8))
        }
        if (index % 8 === 7) {
            let parsedHex = decimalValue.toString(16).slice(-2).padStart(2, "0")
            hashString += parsedHex
            decimalValue = 0
        }
    }

    return hashString
}

/**
 *
 * @param hash (external) => Hash string
 * @param hash2 (external) => ""  ""
 * @returns {number} => Distance between two hashes (always >= 0)
 */
function computeDistance(hash, hash2) {
    const calcHash = hex2Dec(hash)
    const calcHash2 = hex2Dec(hash2)

    const difference = bigInt(calcHash).xor(calcHash2) // NodeJS built-in functions doesn't support large operations (>2^53). So, the node's "xor" operator would be useless here.

    return difference.toString(2).split("1").length - 1
}

/**
 *
 * @param imagePath => Path for an image
 * @param imageSecPath => Path to another, or the same image
 *
 * Compares two images form theis paths, automatically generating
 * their respective hashes in the process.
 *
 * @returns {Promise<{distance: number, hashes: {image1: string, image0: string}}>}
 */

async function distanceImages (imagePath, imageSecPath) {
    const firstHash = await calcHash(imagePath)
    const secondHash = await calcHash(imageSecPath)

    const dist = computeDistance(firstHash, secondHash)
    return { distance: dist, hashes: { image0: firstHash, image1: secondHash } }
}

/**
 * this conversion function was "forked" from https://stackoverflow.com/questions/12532871/how-to-convert-a-very-large-hex-number-to-decimal-in-javascript
 * which is a complete life savior, since NodeJS built-in method "parseInt(..., ...)" wasn't capable to represent big hex (>2^53) precisely.
 * @param hexString => A huge hex :D
 */
function hex2Dec(hexString) {
    if (hexString.length % 2) { hexString = '0' + hexString; }
    const bigNumber = BigInt('0x' + hexString);
    return bigNumber.toString(10);
}

module.exports = {
    calculateHash: calcHash,
    compareHashes: computeDistance,
    compareImages: distanceImages
}
