
//Start off with what passes the first test.
class KNN {
  constructor (kSize) {
    this.kSize = kSize;
    this.points = [];
  }

  train (arr) {
    this.points = this.points.concat(arr);
  }

  _distance (vec1, vec2) {
    const norm1 = vec1.reduce((acc, curr, idx) => {
      return acc + Math.pow(curr - vec2[idx], 2);
    }, 0 );

    return Math.sqrt(norm1);
  }

  _distances (vec, tData) {
    return tData.map(datum => {
      const testVector = datum[0];
      const classification = datum[1];
      const distance = this._distance(vec, testVector);

      return [distance, classification];
    });
  }

  _sorted (arr) {
    return arr.sort((el1, el2) => {
      return el1[0] - el2[0];
    }).map(el => el[1]);
  }

  _majority (num, arr) {
    let freqs = {};
    let most = 0;
    let mck;

    arr.slice(0, num).forEach(el => {
      freqs[el] = ++freqs[el] || 1;
    });

    for (let key in freqs) {
      if (freqs[key] > most) {
        most = freqs[key];
        mck = key;
      }
    }

    return +mck;
  }

  predictSingle (vector) {
    return this._majority(this.kSize, this._sorted(this._distances(vector, this.points)));
  }

  predict (arrOfVecs) {
    return arrOfVecs.map(vec => this.predictSingle(vec));
  }

  score (testData) {
    const tdVecs = testData.map(datum => datum[0])
    const predictions = this.predict(tdVecs);
    const correctCount = predictions.filter((el, id) => {
      return el === testData[id][1];
    });

    return correctCount.length / testData.length;
  }
}


module.exports = KNN;
