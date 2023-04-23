import PHash from './lib/PerceptualHash';
import DHash from './lib/DiferencialHash';

const pHash = new PHash();
const dHash = new DHash();

export type ComparisonOptions = {
	algorithm: 'phash' | 'dhash';
	humanize?: boolean;
	hashes?: boolean;
};

/**
 * @distance Represents the difference level between the given images or hash strings, and is meant to be 
 * interpreted assuming those conditions:
 * - `distance > 0`: Differences were found. Higher nubers, higher difference level.
 * - `distance = 0`: The comparison returned no differences; It can happen when the difference is too small, or when the given images/hashes are equal.
 * 
 * @hashes `hashA` and `hashB` are respective representations of the image inputs
 */
export type DistanceResult = {
	distance: number | string;
	hashes?: { hashA: string; hashB: string };
};

/**
* Performs a comparison between two images, generating their hashes and returning
* their detected difference level in form of a natural integer, is meant to be 
* interpreted assuming those conditions:
* 
* - Higher numbers means high difference
* - Zero (0) means high semelliance, o complete equity.
* 
* @param imageA image to be compared with imageB.
* @param imageB image to be compared with imageA.
* @param options options to be considered during the comparison.
* @returns the semelliance level ofs the two given images.
*/
export async function compare(imageA: string | Buffer, imageB: string | Buffer, options: ComparisonOptions = { algorithm: 'phash', humanize: false }): Promise<DistanceResult> {
	const humanize = Boolean(options?.humanize);

	if (options.algorithm === 'dhash') {
		return dHash.distance(imageA, imageB, humanize);
	}

	return pHash.distance(imageA, imageB, humanize);
}

/**
 * 
 * Performs a comparison between two image hashes.
 * 
 * @param hashA previously generated hash.
 * @param hashB previously generated hash.
 * @param options options to be considered during the comparison.
 * @returns the semelliance level ofs the two given hashs.
 */
export async function compareHash(hashA: string, hashB: string, options: ComparisonOptions = { algorithm: 'phash', humanize: false }) {
	const humanize = Boolean(options?.humanize);

	if (options.algorithm === 'dhash') {
		return dHash.distanceHash(hashA, hashB, humanize);
	}

	return pHash.distanceHash(hashA, hashB, humanize);
}

/**
 * 
 * Calculate the hash string for a given image.
 * 
 * @param image the image to be processed.
 * @param algorithm the algorithm to be used in the hashing process.
 * @returns the generated hash for the given image.
 */
export async function hash(image: string | Buffer, algorithm: 'dhash' | 'phash') {
	if (algorithm === 'dhash') {
		return dHash.execute(image);
	}

	return pHash.execute(image);
}
