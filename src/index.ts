import type DifferencialHash from './lib/DiferencialHash';
import type PerceptualHash from './lib/PerceptualHash';

import PHash from './lib/PerceptualHash';
import DHash from './lib/DiferencialHash';

export type ComparisonOptions = {
	algorithm: 'phash' | 'dhash';
	humanize?: boolean;
};

export type DistanceResult = {
	distance: number | string;
	hashes?: {hashA: string; hashB: string};
};

export default new class Tamayo {
	_dHash: DifferencialHash;
	_pHash: PerceptualHash;

	constructor() {
		this._dHash = new DHash();
		this._pHash = new PHash();
	}

	public async compare(imageA: string | Buffer, imageB: string | Buffer, options: ComparisonOptions = {algorithm: 'phash', humanize: false}): Promise<DistanceResult> {
		const humanize = Boolean(options?.humanize);

		if (options.algorithm === 'dhash') {
			return this._dHash.distance(imageA, imageB, humanize);
		}

		return this._pHash.distance(imageA, imageB, humanize);
	}

	public async compareHash(hashA: string, hashB: string, options: ComparisonOptions = {algorithm: 'phash', humanize: false}) {
		const humanize = Boolean(options?.humanize);

		if (options.algorithm === 'dhash') {
			return this._dHash.distanceHash(hashA, hashB, humanize);
		} 

		return this._pHash.distanceHash(hashA, hashB, humanize);
	}

	public async hash(image: string | Buffer, algorithm: 'dhash' | 'phash') {
		if (algorithm === 'dhash') {
			return this._dHash.execute(image);
		}

		return this._pHash.execute(image);
	}
}();
