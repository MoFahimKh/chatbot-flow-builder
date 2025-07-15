import { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./initial-elements";
import { TextNode } from "./TextNode";
import { ButtonEdge } from "./ButtonEdge";
import { NodePanel } from "./NodePanel";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Save } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const nodeTypes = {
  text: TextNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

export function FlowChart() {
  const { theme, toggleTheme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  let id = 2; // Start from 2 since we have 1 initial node

  const handleSaveFlow = () => {
    const flowData = { nodes, edges };
    console.log("Saving flow:", flowData);
    // TODO: Implement actual save functionality
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const { type: nodeType, data } = JSON.parse(type);
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const newNode: Node = {
        id: `${id++}`,
        type: nodeType,
        position,
        data,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleAddNode = useCallback(
    (type: string, data: any) => {
      const newNode: Node = {
        id: `${id++}`,
        type,
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100,
        },
        data,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <div className="w-full h-screen bg-flow-bg relative flex">
      {/* Left Side: Flow Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Header Controls */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-flow-node-border bg-flow-node/80 backdrop-blur-sm">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              chatbot Chat Flow Builder
            </h1>
            <p className="text-muted-foreground text-sm">
              Design your conversation flow
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-flow-node-border"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            <Button
              onClick={handleSaveFlow}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Flow
            </Button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            className="bg-flow-bg"
            attributionPosition="top-right"
          >
            <Controls className="!bg-flow-node !border-flow-node-border" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              className="!bg-flow-bg"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Right Side: Sidebar Panel */}
      <NodePanel onAddNode={handleAddNode} />
    </div>
  );
}
