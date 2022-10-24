/// <reference types="node" />
import type { DistanceResult } from '../typing/structures';
export default class DifferencialHash {
    private readonly width;
    private readonly height;
    constructor();
    execute(imagePath: string | Buffer): Promise<string>;
    compareHash(hash: string, hash2: string): number;
    distance(imagePath: string | Buffer, image2: string | Buffer, humanize?: boolean): Promise<DistanceResult>;
    private _difference;
    private _hex2Dec;
}
