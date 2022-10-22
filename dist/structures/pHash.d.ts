/// <reference types="node" />
import type { DistanceResult } from '../typing/structures';
export default class PerceptualHash {
    private readonly size;
    private readonly lowSize;
    constructor();
    execute(image: Buffer): Promise<string>;
    distance(imageA: Buffer, imageB: Buffer, humanize: boolean): Promise<DistanceResult>;
    distanceHash(a: string, b: string): number;
    private _setCosine;
    private _setSqrt;
    private _initDct;
}
