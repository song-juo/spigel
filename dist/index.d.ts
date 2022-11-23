/// <reference types="node" />
import type DifferencialHash from './structures/DiferencialHash';
import type PerceptualHash from './structures/PerceptualHash';
import type { ComparisonOptions } from './typing';
import type { DistanceResult } from './typing/structures';
declare const _default: {
    _dHash: DifferencialHash;
    _pHash: PerceptualHash;
    compare(imageA: string | Buffer, imageB: string | Buffer, options?: ComparisonOptions): Promise<DistanceResult>;
    compareHash(hashA: string, hashB: string, options?: ComparisonOptions): Promise<string | number>;
    hash(image: string | Buffer, algorithm: 'dhash' | 'phash'): Promise<string>;
};
export default _default;
