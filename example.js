const imageDiff = require("./index");

async function exampleCases () {
    /* Comparing the same image from its paths */
    console.log("== SAME IMAGE COMPARISON ==")
    let startTime = Date.now()
    const fromRawImages = await imageDiff.compareImages("./images/base-image.jpg", "./images/base-image.jpg")
    // => Outputs 0 (no differences detected)

    console.log("RESULTS:")
    console.log("> Distance:", fromRawImages.distance)
    console.log("> First image hash:", fromRawImages.hashes.image0)
    console.log("> Second image hash:", fromRawImages.hashes.image1)
    console.log("> Time elapsed:", (Date.now() - startTime) / 1000)
    console.log("")

    /* Comparing the different images from its paths */
    console.log("== DIFFERENT IMAGE COMPARISON ==")
    startTime = Date.now()
    const differentRawImages = await imageDiff.compareImages("./images/base-image.jpg", "./images/different-image.jpg")
    // => Outputs X > 0 (difference detected)

    console.log("RESULTS:")
    console.log("> Distance:", differentRawImages.distance)
    console.log("> First image hash:", differentRawImages.hashes.image0)
    console.log("> Second image hash:", differentRawImages.hashes.image1)
    console.log("> Time elapsed:", (Date.now() - startTime) / 1000)
    console.log("")

    /*
    * Comparing the same images above, but from it's output hashes
    * This process tends to be at least 10 times faster than loading
    * the actual images from scratch.
    *
    * There are no need to compare hashes from different images in
    * this example, because it won't add anything new to this explanation.
    */
    console.log("== SAME IMAGE FROM HASH ==")
    startTime = Date.now() // reset time counting
    const fromHash = imageDiff.compareHashes(fromRawImages.hashes.image0, fromRawImages.hashes.image0)

    console.log("RESULTS:")
    console.log("> Distance:", fromHash) // In this case, the hashes aren't part of the function's return.
    console.log("> Time elapsed:", (Date.now() - startTime) / 1000)

}

exampleCases()