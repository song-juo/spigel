export interface ComparisonOptions {
    verbose: boolean
    hashes: boolean
}

export interface ComparisonResult {
    distance: number
    hashes: { image: string, image2: string }
}