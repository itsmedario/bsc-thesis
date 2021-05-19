/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
class Graph {
  vertices;

  adjList;

  constructor(vertices:number) {
    this.vertices = vertices;
    this.adjList = new Map();
  }

  addVertex(v:number):void {
    this.adjList.set(v, []);
  }

  addEdge(v:number, w:number):void {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  removeVertex(v:number):void {
    for (let i = 0; i < this.adjList.get(v).length; i += 1) {
      const j = this.adjList.get(v)[i];
      this.adjList.get(j).pop(v);
    }
    this.adjList.delete(v);
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
