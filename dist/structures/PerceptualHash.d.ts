/// <reference types="node" />
import type { DistanceResult } from '../typing/structures';
export default class PerceptualHash {
    private readonly size;
    private readonly lowSize;
    constructor();
    distance(imageA: string | Buffer, imageB: string | Buffer, humanize: boolean): Promise<DistanceResult>;
    distanceHash(a: string, b: string, humanize: boolean): string | number;
    execute(image: string | Buffer): Promise<string>;
    private _setCosine;
    private _setSqrt;
    private _initDct;
}
