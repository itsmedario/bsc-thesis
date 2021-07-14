/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
class Graph {
  numberOfVertices;

  adjList;

  visitedNodes = new Set();

  queue = [0];

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

  DFS(n:number):void {
    if (!this.visitedNodes.has(n)) {
      this.visitedNodes.add(n);
      for (const i of this.adjList.get(n)) {
        if (!this.visitedNodes.has(i)) {
          this.queue.push(Number(i));
        }
      }
    }
  }

  isEmptyGraph():boolean {
    let empty = true;
    const getKeys = this.adjList.keys();
    for (const i of getKeys) {
      if (this.adjList.get(i).size > 0) {
        empty = false;
      }
    }
    return empty;
  }

  isVertexCover(arr:unknown[]):boolean { // checks if the placed towers actually form a vertex cover
    for (let i = 0; i < arr.length; i += 1) {
      this.removeVertex(Number(arr[i]));
    }

    const solution = this.isEmptyGraph();
    return solution;
  }

  isDominatingSet(arr:unknown[]):boolean { // tests if the the selection is a dominating set
    const coveredVertices = new Set();
    for (let i = 0; i < arr.length; i += 1) {
      for (const j of this.adjList.get(arr[i])) {
        coveredVertices.add(j);
      }
      coveredVertices.add(arr[i]);
    }

    // if every vertex has a marked neighbor, set size = total number of vertices
    const solution = coveredVertices.size === this.numberOfVertices; // assigns a boolean value
    return solution;
  }

  isMST():boolean {
    this.visitedNodes.clear();
    this.queue = [];
    const startNode = 0;
    this.queue.push(startNode);
    while (this.queue.length > 0) {
      const n = this.queue.pop();
      this.DFS(Number(n));
    }
    return this.visitedNodes.size === this.adjList.size;
  }

  removeAdjVertices(v:number):void { // remove the vertex and all its adjacent vertices
    for (const i of this.adjList.get(v)) {
      if (this.adjList.has(i)) {
        this.adjList.delete(i);
      }
    }
    this.adjList.delete(v);
  }

  removeVertex(v:number):void { // remove a vertex and all its incident edges
    for (const i of this.adjList.get(v)) {
      this.adjList.get(i).delete(v);
    }
    this.adjList.delete(v);
  }

  printGraph():void { // prints the adjacency list of every vertex
    const getKeys = this.adjList.keys();

    for (const i of getKeys) {
      const getValues = this.adjList.get(i);
      let conc = '';

      for (const j of getValues) {
        conc += j + ' ';
      }
    }
  }
}

export default Graph;
