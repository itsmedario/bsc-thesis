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

  isEmptyGraph():boolean {
    let empty = true;
    const getKeys = this.adjList.keys();

    this.printGraph();

    for (const i of getKeys) {
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

  removeVertex(v:number):void {
    for (const i of this.adjList.get(v)) {
      console.log(i);
      this.adjList.get(i).delete(v);
    }
    this.adjList.delete(v);
    console.log('removed vertex ' + v);
    console.log('graph ' + this.adjList);
  }

  printGraph():void {
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
