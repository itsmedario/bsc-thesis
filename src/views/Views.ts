const views: Array<{
  id: number;
  path: string;
  title: string;
  img: string;
  view: string;
  component: string;
}> = [
  {
    id: 1,
    path: '/check-weights',
    title: 'Ladungen überprüfen',
    img: 'transport/wood.png',
    view: 'CheckWeights',
    component: 'CheckWeights',
  },
  {
    id: 2,
    path: '/check-bridges',
    title: 'Brücken überprüfen',
    img: 'bridges/bridge_long.png',
    view: 'CheckBridges',
    component: 'CheckBridges',
  },
  {
    id: 3,
    path: '/check-towers',
    title: 'Türme überprüfen',
    img: 'bridges/tower.png',
    view: 'CheckTowers',
    component: 'CheckTowers',
  },
  {
    id: 4,
    path: '/distribute-weights',
    title: 'Boote laden',
    img: 'transport/wood.png',
    view: 'DistributeWeights',
    component: 'DistributeWeights',
  },
  {
    id: 5,
    path: '/build-bridges',
    title: 'Brücken bauen',
    img: 'bridges/bridge_long.png',
    view: 'BuildBridges',
    component: 'BuildBridges',
  },
  {
    id: 6,
    path: '/build-towers',
    title: 'Türme bauen',
    img: 'bridges/tower.png',
    view: 'BuildTowers',
    component: 'BuildTowers',
  },
  {
    id: 7,
    path: '/add-weights',
    title: 'Gewichte ergänzen',
    img: 'transport/wood.png',
    view: 'AddWeights',
    component: 'AddWeights',
  },
  {
    id: 8,
    path: '/optimize-weights',
    title: 'Gewichte optimmieren',
    img: 'transport/wood.png',
    view: 'OptimizeWeights',
    component: 'OptimizeWeights',
  },
  {
    id: 9,
    path: '/build-kiosks',
    title: 'Kioske bauen',
    img: 'bridges/kiosk_true.png',
    view: 'BuildKiosks',
    component: 'BuildKiosks',
  },
];

export default views;
