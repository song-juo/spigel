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
exports.compare = exports.calculate = void 0;
const sharp_1 = __importDefault(require("sharp"));
const big_integer_1 = __importDefault(require("big-integer")); // NodeJS built-in functions doesn't support large operations (>2^53). So, the native "xor" operator would be useless here.
const fs_1 = __importDefault(require("fs"));
function _difference(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseWidth = 9;
        const baseHeight = 8;
        const baseBuffer = typeof image == "string" ? fs_1.default.readFileSync(image) : image;
        const treatedImage = yield (0, sharp_1.default)(baseBuffer)
            .resize(baseWidth, baseHeight) // 9x8 = 72 pixels
            .grayscale()
            .raw()
            .toBuffer();
        const pixels = new Int32Array(treatedImage);
        let difference = [];
        for (let i = 0; i < baseHeight; i++) {
            let startRow = i * baseWidth;
            for (let j = 0; j < baseWidth - 1; j++) {
                let left_pixel_index = startRow + j;
                difference.push(pixels[left_pixel_index] > pixels[left_pixel_index + 1]);
            }
        }
        return difference;
    });
}
function calculate(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const difference = yield _difference(imagePath);
        let decimalValue = 0;
        let hashString = "";
        for (const [index, value] of difference.entries()) {
            const numericValue = value ? 1 : 0;
            if (value) {
                decimalValue += numericValue * (2 ** (index % 8));
            }
            if (index % 8 === 7) {
                let parsedHex = decimalValue.toString(16).slice(-2).padStart(2, "0");
                hashString += parsedHex;
                decimalValue = 0;
            }
        }
        return hashString;
    });
}
exports.calculate = calculate;
function compareHash(hash, hash2) {
    const calcHash = hex2Dec(hash);
    const calcHash2 = hex2Dec(hash2);
    const difference = (0, big_integer_1.default)(calcHash).xor(calcHash2);
    return difference.toString(2).split("1").length - 1;
}
function compare(imagePath, image2, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstHash = yield calculate(imagePath);
        const secondHash = yield calculate(image2);
        const dist = compareHash(firstHash, secondHash);
        return { distance: dist, hashes: { image: firstHash, image2: secondHash } };
    });
}
exports.compare = compare;
function hex2Dec(hex) {
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    const bigNumber = BigInt('0x' + hex);
    return bigNumber.toString(10);
}
