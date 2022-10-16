/// <reference types="node" />
interface ComparisonOptions {
    verbose: boolean;
    hashes: boolean;
}
interface ComparisonResult {
    distance: number;
    hashes: {
        image: string;
        image2: string;
    };
}
export declare function calculate(imagePath: string | Buffer): Promise<string>;
export declare function compare(imagePath: string | Buffer, image2: string | Buffer, options?: ComparisonOptions): Promise<ComparisonResult>;
export {};
