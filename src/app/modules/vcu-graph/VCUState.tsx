import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'mvcu', position: { x: 200, y: 200 }, data: { label: 'MVCU' }, style: { background: '#0077b6', color: 'white' }, 
  sourcePosition: Position.Left, 
  handles: [
    {
      id: 'a',
      nodeId: 'mvcu',
      x: 20,
      y: 10,
      position: 'top',
      type: 'source',
      width: 5,
      height: 5,
    },
    {
      id: 'b',
      nodeId: 'mvcu',
      x: 30,
      y: 50,
      position: 'top',
      type: 'target',
      width: 5,
      height: 5,
    }
  ]
},
  {
    id: 'vcu1',
    position: { x: 50, y: 100 },
    data: { label: 'VCU 1' },
    style: { background: '#2ecc71', color: 'white' },
    targetPosition: Position.Right,
    // handles: [
    //   {
    //     position: Position.Right,
    //     id: 'a',
    //     x: 20,
    //     y: 10,
    //   },
      
    // ],
  },
  // {
  //   id: 'vcu2',
  //   position: { x: 50, y: 300 },
  //   data: { label: 'VCU 2' },
  //   style: { background: '#2ecc71', color: 'white' },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  //   handles: [
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'a',
  //     },
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'b',
  //       style: { left: 10 },
  //     },
  //   ],
  // },
  // {
  //   id: 'vcu3',
  //   position: { x: 350, y: 100 },
  //   data: { label: 'VCU 3' },
  //   style: { background: '#2ecc71', color: 'white' },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  //   handles: [
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'a',
  //     },
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'b',
  //       style: { left: 10 },
  //     },
  //   ],
  // },
  // {
  //   id: 'vcu4',
  //   position: { x: 350, y: 300 },
  //   data: { label: 'VCU 4' },
  //   style: { background: '#2ecc71', color: 'white' },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  //   handles: [
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'a',
  //     },
  //     {
  //       type: 'source',
  //       position: Position.Right,
  //       id: 'b',
  //       style: { left: 10 },
  //     },
  //   ],
  // },
];

const initialEdges = [
  { id: 'e1', source: 'mvcu', target: 'vcu1',  animated: true, label: 'Connected', style: { stroke: '#2ecc71' } },
  // { id: 'e2', source: 'mvcu', target: 'vcu2', sourceHandle: 'b', animated: true, label: 'Connected', style: { stroke: '#2ecc71' } },
  // { id: 'e3', source: 'mvcu', target: 'vcu3', sourceHandle: 'a', animated: true, label: 'Error', style: { stroke: '#e74c3c' } },
  // { id: 'e4', source: 'mvcu', target: 'vcu4', sourceHandle: 'b', animated: true, label: 'Disconnected', style: { stroke: '#7f8c8d' } },
];

export default function VCUConnectionDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className='h-[500px]'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>

  );
}