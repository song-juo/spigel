import type DifferencialHash from './structures/dHash';
import type PerceptualHash from './structures/pHash';
import type {ComparisonOptions} from './typing';

import PHash from './structures/pHash';
import DHash from './structures/dHash';
import type {DistanceResult} from './typing/structures';
import { readFileSync } from 'fs';

export default new class Tamayo {
	private readonly _dHash: DifferencialHash;
	private readonly _pHash: PerceptualHash;

	constructor() {
		this._dHash = new DHash();
		this._pHash = new PHash();
	}

	public async compare(imageA: string | Buffer, imageB: string | Buffer, options: ComparisonOptions = {algorithm: 'phash'}): Promise<DistanceResult> {
		const humanize = Boolean(options?.humanize);

		const _image = typeof imageA === 'string' ? readFileSync(imageA) : imageA;

		if (options.algorithm === 'dhash') {
			return this._dHash.distance(imageA, imageB, humanize);
		}

		return this._pHash.distance(imageA, imageB, humanize);
	}
}();
