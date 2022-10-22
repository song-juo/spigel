import sharp from 'sharp';
import bigInt from 'big-integer';
import {readFileSync} from 'fs';

import type {DistanceResult} from '../typing/structures';
import Utils from './Utils';

/* This code implements the "dHash" algorithm described in: https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html */

export default class DifferencialHash {
	private readonly width: number;
	private readonly height: number;

	constructor() {
		this.width = 9;
		this.height = 8;
	}

	public async execute(imagePath: string | Buffer): Promise<string> {
		const difference = await this._difference(imagePath);

		let decimalValue = 0;
		let hashString = '';

		for (const [index, value] of difference.entries()) {
			const numericValue = value ? 1 : 0;

			if (value) {
				decimalValue += numericValue * (2 ** (index % 8));
			}

			if (index % 8 === 7) {
				const parsedHex = decimalValue.toString(16).slice(-2).padStart(2, '0');
				hashString += parsedHex;
				decimalValue = 0;
			}
		}

		return hashString;
	}

	public compareHash(hash: string, hash2: string): number {
		const calcHash = this._hex2Dec(hash);
		const calcHash2 = this._hex2Dec(hash2);

		const difference = bigInt(calcHash).xor(calcHash2);

		return difference.toString(2).split('1').length - 1;
	}

	public async distance(imagePath: string | Buffer, image2: string | Buffer, humanize: boolean): Promise<DistanceResult> {
		const firstHash = await this.execute(imagePath);
		const secondHash = await this.execute(image2);

		const dist = this.compareHash(firstHash, secondHash);
		const result: DistanceResult = {distance: dist, hashes: {hashA: firstHash, hashB: secondHash}};

		if (humanize) {
			result.distance = Utils.humanize(dist);
		}

		return result;
	}

	private async _difference(image: string | Buffer): Promise<boolean[]> {
		const baseWidth = this.width;
		const baseHeight = this.height;
		const baseBuffer = typeof image === 'string' ? readFileSync(image) : image;

		const treatedImage = await sharp(baseBuffer)
			.resize(baseWidth, baseHeight) // 9x8 = 72 pixels
			.grayscale()
			.raw()
			.toBuffer();

		const pixels = new Int32Array(treatedImage);
		const difference = [];

		for (let i = 0; i < baseHeight; i++) {
			const startRow = i * baseWidth;
			for (let j = 0; j < baseWidth - 1; j++) {
				const leftPixelIndex = startRow + j;
				difference.push(pixels[leftPixelIndex] > pixels[leftPixelIndex + 1]);
			}
		}

		return difference;
	}

	private _hex2Dec(hex: string) {
		if (hex.length % 2) {
			hex = '0' + hex;
		}

		const bigNumber = BigInt('0x' + hex);
		return bigNumber.toString(10);
	}
}
