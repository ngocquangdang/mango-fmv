import { type Node, type Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  { id: '1', type: 'pixel', data: { name: 'Start Game' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'pixel', data: { name: 'Tutorial' }, position: { x: 0, y: 0 } },
  { id: '3', type: 'pixel', data: { name: 'Level 1' }, position: { x: 0, y: 0 } },
  { id: '4', type: 'pixel', data: { name: 'Level 2' }, position: { x: 0, y: 0 } },
  { id: '5', type: 'pixel', data: { name: 'Boss Fight' }, position: { x: 0, y: 0 } },
  { id: '6', type: 'pixel', data: { name: 'Victory' }, position: { x: 0, y: 0 } },
  { id: '7', type: 'pixel', data: { name: 'Game Over' }, position: { x: 0, y: 0 } },
  { id: '8', type: 'pixel', data: { name: 'Game Over 1' }, position: { x: 0, y: 0 } },
  { id: '9', type: 'pixel', data: { name: 'Game Over 2' }, position: { x: 0, y: 0 } },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'pixel' },
  { id: 'e2-3', source: '2', target: '3', type: 'pixel' },
  { id: 'e3-4', source: '3', target: '4', type: 'pixel' },
  { id: 'e4-5', source: '4', target: '5', type: 'pixel' },
  { id: 'e5-6', source: '5', target: '6', type: 'pixel' },
  { id: 'e5-7', source: '5', target: '7', type: 'pixel' },
  { id: 'e5-9', source: '5', target: '9', type: 'pixel' },
  { id: 'e7-8', source: '7', target: '8', type: 'pixel' },
  { id: 'e6-8', source: '6', target: '8', type: 'pixel' },
];
