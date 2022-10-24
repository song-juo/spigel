

  

<p align="center">
<img  src="https://i.imgur.com/9jz7C6W.png"/>
<br/>
<img src="https://i.imgur.com/96EInCB.png"/>
<img src="https://i.imgur.com/32It8av.png"/>
<img src="https://forthebadge.com/images/badges/built-with-love.svg"/>
</p>

**Fast** node library which implements many hashing algorithms and media manipulation bindings into a *friendly API* which **discards the use of AI (Artificial Intelligence)** for image semelliance level classsification trough the use of pure math.

📒 ***[Check our Documentation!](https://github.com/myur4/tamayo/wiki)***

### Give it a try 🌸

```bash
npm i tamayo
```

### 🖼️ It's simple as:

```ts
import { compare } from  'tamayo';

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
- [ ] First Tamayo's major release
