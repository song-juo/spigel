import type DifferencialHash from './structures/DiferencialHash';
import type PerceptualHash from './structures/PerceptualHash';
import type {ComparisonOptions} from './typing';

import PHash from './structures/PerceptualHash';
import DHash from './structures/DiferencialHash';
import type {DistanceResult} from './typing/structures';

export default new class Tamayo {
	private readonly _dHash: DifferencialHash;
	private readonly _pHash: PerceptualHash;

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
}();
