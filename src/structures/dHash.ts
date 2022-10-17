import sharp from 'sharp';
import fs from 'fs';
import bigInt from 'big-integer';

/* This code implements the "dHash" algorithm described in: https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html */

interface ComparisonOptions {
    verbose: boolean
    hashes: boolean
}

interface ComparisonResult {
    distance: number
    hashes: { image: string, image2: string }
}

export default class dHash {

    private width: number;
    private height: number;

    constructor() {
        this.width = 9;
        this.height = 8;
    }

    public async calculate(imagePath: string | Buffer): Promise<string> {
        const difference = await this._difference(imagePath)

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

    public compareHash(hash: string, hash2: string): number {
        const calcHash = this._hex2Dec(hash)
        const calcHash2 = this._hex2Dec(hash2)

        const difference = bigInt(calcHash).xor(calcHash2)

        return difference.toString(2).split("1").length - 1
    }

    public async compare(imagePath: string | Buffer, image2: string | Buffer, options?: ComparisonOptions): Promise<ComparisonResult>{
        const firstHash = await this.calculate(imagePath)
        const secondHash = await this.calculate(image2)
    
        const dist = this.compareHash(firstHash, secondHash)
    
        return {distance: dist, hashes: {image: firstHash, image2: secondHash}}
    }

    private async _difference(image: string | Buffer): Promise<boolean[]> {
        const baseWidth = this.width
        const baseHeight = this.height
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
    };

    private _hex2Dec(hex: string) {
        if (hex.length % 2) {
            hex = '0' + hex;
        }
        const bigNumber = BigInt('0x' + hex)
        return bigNumber.toString(10)
    }
}