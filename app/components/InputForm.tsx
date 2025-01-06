"use client"; // Add this at the very top of the file

import { useState } from "react";

interface GraphNode {
  name: string;
  edges: { targetNode: { name: string }; weight: number }[];
}

interface InputFormProps {
  onSubmit: (fromNode: string, toNode: string, graphNodes: GraphNode[]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
const [graphNodes, setGraphNodes] = useState<GraphNode[]>([
    { name: "A", edges: [{ targetNode: { name: "B" }, weight: 1 }] },
    { name: "B", edges: [{ targetNode: { name: "C" }, weight: 2 }] },
    { name: "C", edges: [{ targetNode: { name: "D" }, weight: 3 }] },
    { name: "D", edges: [] },
]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(fromNode, toNode, graphNodes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>From Node:</label>
        <input
          type="text"
          value={fromNode}
          onChange={(e) => setFromNode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>To Node:</label>
        <input
          type="text"
          value={toNode}
          onChange={(e) => setToNode(e.target.value)}
          required
        />
      </div>
      {/* Implement dynamic graph input here, where users can add edges for each node */}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default InputForm;
