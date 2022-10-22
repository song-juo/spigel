
<p align="center">
<img src="https://i.imgur.com/9jz7C6W.png"></img>
</p>

**Fast** node library which implements many hashing algorithms and media manipulation bindings into a *friendly API* which **discards the use of AI (Artificial Intelligence)** for image semelliance level classsification trough the use of pure math.

### Give it a try 🌸

```bash
npm i tamayo
```

### 🖼️ It's simple as:

```ts
import { compare } from 'tamayo';

async function someFunction() {
const result = await compare('./example.png', './example.jpg');
// => Outputs the difference between the input, and it's correspondent hashes.
}
```

### Documentation
Coming soon...
  

### 📝 ToDo List - Please, contribute!

- [x] Implement Dhash (Difference Hash)

- [x] Cleanup code & comments

- [x] Publish first release to GitHub

- [x] Make it able to be posted in NPM

- [x] Publish first release to NPM

- [x] Full Typescript conversion

- [x] Ensure support for cross-comparisons between strings and buffers

- [x] Implement pHash (Perceptual Hash)

- [x] Function to Class structure conversion
    - [x] Convert algorithm functions to classes
    - [x] Assert typings to algorithms 
    - [x] Humanize comparison results

- [] Write a proper documentation
- [] Publish new release to npm
- [] Implement AverageHash