import { readFileSync } from 'fs';
import sharp from 'sharp';

export default class pHash {
    
    private size: number;
    private low_size: number;

    constructor() {
        this.size = 32;
        this.low_size = 8;
    }

    public async execute (image: string | Buffer) {
        let _image = typeof image == "string"
            ? readFileSync(image) : image;

        _image = await sharp(_image)
            .grayscale()
            .resize(this.size, this.size, { fit: 'fill' })
            .rotate()
            .raw()
            .toBuffer();

        //const pixels = new Int32Array(_image);
        const signal = new Array(this.size);
        
        for (let x = 0; x < this.size; x++) {
          signal[x] = new Array(this.size);
          for (let y = 0; y < this.size; y++) {
            signal[x][y] = _image[this.size * y + x]
          }
        }

        const sqrt = this._setSQRT();
        const cosine = this._setCosine();

        const dct = this._initDCT(signal, cosine, sqrt);
        
        let finalSum = 0;

        for (let x = 0; x < this.low_size; x++) {
          for (let y = 0; y < this.low_size; y++) {
            finalSum += dct[x + 1][y + 1];
          }
        }

        const average = finalSum / (this.low_size * this.low_size);

        let hash = "";

        for (let x = 0; x < this.low_size; x++) {
          for (let y = 0; y < this.low_size; y++) {
            hash += dct[x + 1][y + 1] > average ? "1" : "0";
          }
        }

        console.log(hash);
        return hash;
    }

    public async distance (a: string, b: string) {
      let count = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          count++;
        }
      }
      return count;
    }

    private _setCosine (): number[] {
        const size = this.size;
        const cosArray = new Array(size);

        for (let i = 0; i < size; i++) {
            cosArray[i] = new Array(size);
          for (let n = 0; n < size; n++) {
            cosArray[i][n] = Math.cos(((2 * i + 1) / (2.0 * size)) * n * Math.PI);
          }
        }
        
        return cosArray;
    };

    private _setSQRT (): number[] {
        const size = this.size;
        const c = new Array(size);
        
        for (let i = 1; i < size; i++) {
          c[i] = 1;
        }
        
        c[0] = 1 / Math.sqrt(2.0);
        
        return c;
    };

    private _initDCT (signal: number[][], cos: any, sqrt: number[]) {
        
        const size = this.size;
        const sampleArr = new Array(size);
        
        console.log(size, sampleArr)

        for (let u = 0; u < size; u++) {
          sampleArr[u] = new Array(size);
          for (let v = 0; v < size; v++) {
            let sum = 0;
            for (let i = 0; i < size; i++) {
              for (let j = 0; j < size; j++) {
                sum += cos[i][u] * cos[j][v] * signal[i][j];
              }
            }
            sum *= (sqrt[u] * sqrt[v]) / 4;
            sampleArr[u][v] = sum;
          }
        }
        return sampleArr;
    }
}