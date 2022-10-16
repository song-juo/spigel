
<div align="center">
  <h1>🔎 Dhash</h1>
</div>

![Imgur](https://i.imgur.com/0yaLSxn.png)

**Fast**, **reliable** and **deadly simple** node module which implements the "[Dhash](https://www.hackerfactor.com/blog/?/archives/529-Kind-of-Like-That.html)" which has the ability to load/compare/hash images with pixel-range precision under few milliseconds and discards the use of machine learning (OpenCV and similar). Note that this module **is used to measure difference, which means its able to not just compare if two images are the same, but point the similarity/difference level of them**

Actually, that's the only decent and full-maintained package which implements *Dhash* for NodeJS. Also, a big thanks for the [Sharp lib's](https://github.com/lovell/sharp) maintainers for their hard work and perfectionism into binding **libvps** for JavaScript.

The **distance** between two images is measured according to its distance, which **0 means EQUAL/NOT DIFFERENCE FOUND** and anything **> 0** means a difference level found. Inside our tests, comparisons which returns a distance greater than 20 represent a completely different image, and **1~5** represents a huge similarity.

### Installation

```
npm install --save @myur4/dhash
```

### 🖼️ It's simple as:

```js
import { compare } from './index';

async function someFunction() {
   const result = await compare(string or buffer, string or buffer);
   // => Outputs the difference between the input, and it's correspondent hashes.
}
```

### Documentation


## 📝 TODO LIST

- [x] Implement Dhash
- [x] Cleanup code & comments
- [x] Publish first release to GitHub
- [x] Make it able to be posted in NPM
- [x] Publish first release to NPM
- [x] Ensure support for cross-comparisons between strings and buffers 
- [ ] Full Typescript conversion