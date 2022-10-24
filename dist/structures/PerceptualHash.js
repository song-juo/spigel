"use strict";
/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
const Utils_1 = __importDefault(require("./Utils"));
class PerceptualHash {
    constructor() {
        this.size = 32;
        this.lowSize = 8;
    }
    distance(imageA, imageB, humanize) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash1 = yield this.execute(imageA);
            const hash2 = yield this.execute(imageB);
            const _distance = this.distanceHash(hash1, hash2, humanize);
            const result = { distance: _distance, hashes: { hashA: hash1, hashB: hash2 } };
            return result;
        });
    }
    distanceHash(a, b, humanize) {
        let distance = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                distance++;
            }
        }
        if (humanize) {
            return Utils_1.default.humanize(distance);
        }
        return distance;
    }
    execute(image) {
        return __awaiter(this, void 0, void 0, function* () {
            image = yield (0, sharp_1.default)(image)
                .grayscale()
                .resize(this.size, this.size, { fit: 'fill' })
                .rotate()
                .raw()
                .toBuffer();
            const signal = new Array(32);
            for (let x = 0; x < 32; x++) {
                signal[x] = new Array(32);
                for (let y = 0; y < 32; y++) {
                    signal[x][y] = image[this.size * y + x];
                }
            }
            const sqrt = this._setSqrt();
            const cosine = this._setCosine();
            const dct = this._initDct(signal, cosine, sqrt);
            let finalSum = 0;
            for (let x = 0; x < this.lowSize; x++) {
                for (let y = 0; y < this.lowSize; y++) {
                    finalSum += dct[x + 1][y + 1];
                }
            }
            const average = finalSum / (this.lowSize * this.lowSize);
            let hash = '';
            for (let x = 0; x < this.lowSize; x++) {
                for (let y = 0; y < this.lowSize; y++) {
                    hash += dct[x + 1][y + 1] > average ? '1' : '0';
                }
            }
            return hash;
        });
    }
    _setCosine() {
        const { size } = this;
        const cosArray = new Array(size);
        for (let i = 0; i < size; i++) {
            cosArray[i] = new Array(size);
            for (let n = 0; n < size; n++) {
                cosArray[i][n] = Math.cos(((2 * (i + 1)) / (2.0 * size)) * n * Math.PI);
            }
        }
        return cosArray;
    }
    _setSqrt() {
        const { size } = this;
        const c = new Array(size);
        for (let i = 1; i < size; i++) {
            c[i] = 1;
        }
        c[0] = 1 / Math.sqrt(2.0);
        return c;
    }
    _initDct(signal, cos, sqrt) {
        const { size } = this;
        const sampleArr = new Array(size);
        for (let u = 0; u < size; u++) {
            sampleArr[u] = new Array(size);
            for (let v = 0; v < size; v++) {
                let sum = 0;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        sum += cos[i][u] * cos[j][v] * signal[i][j];
                    }
                }
                sum *= (sqrt[u] * sqrt[v]) / 4;
                sampleArr[u][v] = sum;
            }
        }
        return sampleArr;
    }
}
exports.default = PerceptualHash;
