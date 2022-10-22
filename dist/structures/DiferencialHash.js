"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const big_integer_1 = __importDefault(require("big-integer"));
const fs_1 = require("fs");
const Utils_1 = __importDefault(require("./Utils"));
/* This code implements the "dHash" algorithm described in: https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html */
class DifferencialHash {
    constructor() {
        this.width = 9;
        this.height = 8;
    }
    execute(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const difference = yield this._difference(imagePath);
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
        });
    }
    compareHash(hash, hash2) {
        const calcHash = this._hex2Dec(hash);
        const calcHash2 = this._hex2Dec(hash2);
        const difference = (0, big_integer_1.default)(calcHash).xor(calcHash2);
        return difference.toString(2).split('1').length - 1;
    }
    distance(imagePath, image2, humanize) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstHash = yield this.execute(imagePath);
            const secondHash = yield this.execute(image2);
            const dist = this.compareHash(firstHash, secondHash);
            const result = { distance: dist, hashes: { hashA: firstHash, hashB: secondHash } };
            if (humanize) {
                result.distance = Utils_1.default.humanize(dist);
            }
            return result;
        });
    }
    _difference(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseWidth = this.width;
            const baseHeight = this.height;
            const baseBuffer = typeof image === 'string' ? (0, fs_1.readFileSync)(image) : image;
            const treatedImage = yield (0, sharp_1.default)(baseBuffer)
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
        });
    }
    _hex2Dec(hex) {
        if (hex.length % 2) {
            hex = '0' + hex;
        }
        const bigNumber = BigInt('0x' + hex);
        return bigNumber.toString(10);
    }
}
exports.default = DifferencialHash;
