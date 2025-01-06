// pages/index.tsx
import { useState } from "react";
import axios from "axios";
import InputForm from "../components/InputForm";

interface TraversedNode {
  node: string;
  distance: number;
}

const Home: React.FC = () => {
  const [result, setResult] = useState<{ nodes: TraversedNode[]; distance: number | null }>({
    nodes: [],
    distance: null,
  });

  const handleSubmit = async (fromNode: string, toNode: string, graphNodes: any[]) => {
    try {
    interface Edge {
      targetNode: { name: string };
      weight: number;
    }

    interface GraphNode {
      name: string;
      edges: Edge[];
    }

    interface ShortestPathResponse {
        NodeNames: TraversedNode[];
        Distance: number;
    }

    const response = await axios.post<ShortestPathResponse>("http://localhost:5085/api/ShortestPath/shortest-path", {
      fromNode,
      toNode,
      graphNodes: graphNodes.map((node: GraphNode) => ({
        name: node.name,
        edges: node.edges.map((edge: Edge) => ({
        targetNode: { name: edge.targetNode.name },
        weight: edge.weight,
        })),
      })),
    });

      console.log(response, "response");
      const { NodeNames, Distance } = response.data;
      setResult({ nodes: NodeNames, distance: Distance });
      console.log(result, "result");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Shortest Path Finder</h1>
      <InputForm onSubmit={handleSubmit} />
      <div>
        <h2>Calculated Path:</h2>
        <ul>
          {result.nodes.map((node, index) => (
            <li key={index}>
              Node: {node.node}, Distance: {node.distance}
            </li>
          ))}
        </ul>
        <h3>Total Distance: {result.distance}</h3>
      </div>
    </div>
  );
};

export default Home;
