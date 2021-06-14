/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable guard-for-in */
class Graph {
  numberOfVertices;

  adjList;

  constructor(vertices:number) {
    this.numberOfVertices = vertices;
    this.adjList = new Map();
  }

  addVertex(v:number):void {
    this.adjList.set(v, new Set());
  }

  addEdge(v:number, w:number):void {
    this.adjList.get(v).add(w);
    this.adjList.get(w).add(v);
  }

  /* createProposition(min:number, max:number):any {
    const proposition = [];
    let n = min + Math.floor(Math.random() * (max - min + 1));

    for (let i = 0; i < this.numberOfVertices; i += 0) {

    }

    for (let i = 0; i < this.numberOfVertices; i += 1) {
      if (Math.random() > 1 / 2 && max > 0) {
        proposition.push(true);
        max -= 1;
      } else {
        proposition.push(false);
      }
    }
    return proposition;
  } */

  isEmptyGraph():boolean {
    let empty = true;
    const getKeys = this.adjList.keys();

    this.printGraph();

    for (const i of getKeys) {
      console.log(i);
      if (this.adjList.get(i).size > 0) {
        empty = false;
      }
    }
    return empty;
  }

  isVertexCover(arr:unknown[]):boolean { // checks the placed towers actually form a vertex cover
    for (let i = 0; i < arr.length; i += 1) {
      this.removeVertex(Number(arr[i]));
    }

    const solution = this.isEmptyGraph();

    console.log(solution);
    return solution;
  }

  isDominatingSet(arr:unknown[]):boolean { // tests if the the selection is a dominating set
    console.log('is dom set?');

    const coveredVertices = new Set();
    for (let i = 0; i < arr.length; i += 1) {
      for (const j of this.adjList.get(arr[i])) {
        coveredVertices.add(j);
      }
      coveredVertices.add(arr[i]);
    }

    // if every vertex has a marked neighbor, the set is empty
    const solution = coveredVertices.size === this.numberOfVertices;
    console.log(coveredVertices.size);
    console.log(this.numberOfVertices);

    return solution;
  }

  /* isMST(arr:unknown[]):boolean {
    return true;
  } */

  removeAdjVertices(v:number):void { // remove the vertex and all its adjacent vertices
    for (const i of this.adjList.get(v)) {
      if (this.adjList.has(i)) {
        this.adjList.delete(i);
        console.log(i);
      }
    }
    this.adjList.delete(v);
    console.log('removed vertex ' + v);
    console.log('graph ' + this.adjList.keys);
  }

  removeVertex(v:number):void { // remove a vertex and all its incident edges
    for (const i of this.adjList.get(v)) {
      console.log(i);
      this.adjList.get(i).delete(v);
    }
    this.adjList.delete(v);
    console.log('removed vertex ' + v);
    console.log('graph ' + this.adjList);
  }

  printGraph():void { // prints the adjacency list of every vertex
    const getKeys = this.adjList.keys();

    for (const i of getKeys) {
      const getValues = this.adjList.get(i);
      let conc = '';

      for (const j of getValues) {
        conc += j + ' ';
      }
      console.log(i + ' -> ' + conc);
    }
  }
}

export default Graph;
