
<div align="center">
  <h1>🔎 imageHash (alpha)</h1>
</div>

![Imgur](https://i.imgur.com/0yaLSxn.png)

**Fast**, **reliable** and **deadly simple** node module which implements the "[Dhash](https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html)" which has the ability to load/compare/hash images with pixel-range precision under few milliseconds and discards the use of machine learning (OpenCV and similar). Note that this module **is used to measure difference, which means its able to not just compare if two images are the same, but point the similarity/difference level of them**

Actually, that's the only decent and full-maintained package which implements *Dhash* for NodeJS. Also, a big thanks for the [Sharp lib's](https://github.com/lovell/sharp) maintainers for their hard work and perfectionism into binding **libvps** for JavaScript.

The **distance** between two images is measured according to its distance, which **0 means EQUAL/NOT DIFFERENCE FOUND** and anything **> 0** means a difference level found. Inside our tests, comparisons which returns a distance greater than 20 represent a completely different image, and **1~5** represents a huge similarity.

### Installation

```
npm install --save @myur4/dhash
```

### 🖼️ How to use it? Let's see:

```js
const imageHash = require("@myur4/dhash");

async function someFunction() {
    /* Compares images from its paths */
    const difference = await imageHash.compareImages("PATH/TO/IMAGE0", "PATH/TO/IMAGE1");
    // Outputs: { distance: number, hashes: { image0: string, image1: string }}
    
    /* Comparing images from its generated hashes */
    const differenceHash = imageHash.compareHashes("HASH", "HASH2");
    // Outputs: distance (number)
    
    /* Generate hash from a single image */
    const myHash = await imageHash.calculateHash("PATH/TO/IMAGE");
    // Outputs: hash (string, length: 18)
}
```

## 📝 TODO LIST

- [x] Implement Dhash
- [x] Cleanup code & comments
- [x] Publish first release to GitHub
- [x] Make it able to be posted in NPM
- [x] Publish first release to NPM
- [ ] Convert code into TypeScript (or add typings)

