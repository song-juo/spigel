<p align="center">
<img  src="https://spigel.gsant.org/assets/images/logo.png"/>
<br/>

<img src="https://forthebadge.com/images/badges/built-with-love.svg"/>
</p>

**Fast** node library which implements many hashing algorithms and media manipulation bindings into a *friendly API* which **discards the use of ML (Machine Learning)** for image semelliance level classsification trough the use of pure math.

📒 ***[Check our Documentation!](https://spigel.gsant.org/)***

### Give it a try 🌸

```bash
npm i spigel
```

### 🖼️ It's simple as:

```ts
import { compare } from 'spigel';

async function someFunction() {
const result = await compare('./example.png', './example2.png', { humanize: true });
// => { distance: 'different', hash: { hashA: '...', hashB: '...' } }
}
```

### 📝 ToDo List - Please, contribute!
- [x] Implement Dhash (Difference Hash)

- [x] Cleanup code & comments

- [x] Publish first release to GitHub

- [x] Make it able to be posted in NPM

- [x] Publish first release to NPM

- [x] Full Typescript conversion

- [x] Ensure support for cross-comparisons between strings and buffers

- [x] Implement pHash (Perceptual Hash)

- [x] Modernize our code's structure
	- [x] Function to Class structure conversion
	- [x] Convert algorithm functions to classes
	- [x] Assert typings to algorithms
	- [x] Humanize comparison results

- [x] Write a detailed documentation

- [x] First hikaku's major release

- [x] Project's name changed from "Hikaku" to "Spigel" 
