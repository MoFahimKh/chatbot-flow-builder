import { Node, Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "text",
    position: { x: 250, y: 100 },
    data: {
      label: "Welcome Message",
      message:
        "Hi! Welcome to our chatbot chat flow. How can I help you today?",
    },
  },
];

export const initialEdges: Edge[] = [];
