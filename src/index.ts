import sharp from 'sharp';
import bigInt from 'big-integer'; // NodeJS built-in functions doesn't support large operations (>2^53). So, the native "xor" operator would be useless here.
import fs from 'fs';

/* This code implements the "dHash" algorithm described in: https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html */

interface ComparisonOptions {
    verbose: boolean
    hashes: boolean
}

interface ComparisonResult {
    distance: number
    hashes: { image: string, image2: string }
}

async function _difference(image: string | Buffer): Promise<boolean[]> {

    const baseWidth = 9
    const baseHeight = 8
    const baseBuffer = typeof image == "string" ? fs.readFileSync(image) : image;

    const treatedImage = await sharp(baseBuffer)
        .resize(baseWidth, baseHeight) // 9x8 = 72 pixels
        .grayscale()
        .raw()
        .toBuffer()

    const pixels = new Int32Array(treatedImage)
    let difference = []

    for (let i = 0; i < baseHeight; i++) {
        let startRow = i * baseWidth
        for (let j = 0; j < baseWidth - 1; j++) {
            let left_pixel_index = startRow + j
            difference.push(pixels[left_pixel_index] > pixels[left_pixel_index + 1])
        }
    }

    return difference
}

export async function calculate(imagePath: string | Buffer): Promise<string> {
    const difference = await _difference(imagePath)

    let decimalValue = 0
    let hashString = ""

    for (const [index, value] of difference.entries()) {

        const numericValue = value ? 1 : 0;

        if (value) {
            decimalValue += numericValue * (2 ** (index % 8))
        }
        if (index % 8 === 7) {
            let parsedHex = decimalValue.toString(16).slice(-2).padStart(2, "0")
            hashString += parsedHex
            decimalValue = 0
        }
    }

    return hashString
}

function compareHash(hash: string, hash2: string): number {
    const calcHash = hex2Dec(hash)
    const calcHash2 = hex2Dec(hash2)

    const difference = bigInt(calcHash).xor(calcHash2)

    return difference.toString(2).split("1").length - 1
}

export async function compare(imagePath: string | Buffer, image2: string | Buffer, options?: ComparisonOptions): Promise<ComparisonResult>{
    const firstHash = await calculate(imagePath)
    const secondHash = await calculate(image2)

    const dist = compareHash(firstHash, secondHash)

    return {distance: dist, hashes: {image: firstHash, image2: secondHash}}
}

function hex2Dec(hex: string) {
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    const bigNumber = BigInt('0x' + hex)
    return bigNumber.toString(10)
}
