type Node<T> = {
  value: T;
  children: Node<T>[];
  depth?: number;
};

// Generic interface for nodes with neighbors (for graph-like structures)
interface GraphNode<T> {
  id: T;
  neighbors: T[];
}

// The main Breadth-Limited Search function
function breadthLimitedSearch<T>(
  startNode: Node<T> | GraphNode<T>,
  goal: T,
  limit: number,
  isGraphNode = false
): { path: T[], found: boolean, depth: number } | null {
  // Initialize the starting node with depth 0
  const start = isGraphNode 
    ? { id: startNode.id, neighbors: startNode.neighbors, depth: 0 } as GraphNode<T> & { depth: number }
    : { ...startNode, depth: 0 } as Node<T> & { depth: number };

  // Keep track of visited nodes to avoid cycles
  const visited = new Set<T>();
  visited.add(isGraphNode ? start.id : start.value);

  // Queue for BFS - stores nodes with their depth
  const queue: (Node<T> & { depth: number } | (GraphNode<T> & { depth: number }))[] = [start];

  while (queue.length > 0) {
    const current = queue.shift()!; // Dequeue

    const currentValue = isGraphNode ? current.id : current.value;
    const currentDepth = current.depth;

    // Check if we've found the goal
    if (currentValue === goal) {
      // Reconstruct path (simplified - just returns the goal node for now)
      return {
        path: [goal], // In a full implementation, you'd track parent pointers
        found: true,
        depth: currentDepth
      };
    }

    // Don't expand if we've reached the depth limit
    if (currentDepth >= limit) {
      continue;
    }

    // Get neighbors/children
    let neighbors: T[];
    if (isGraphNode) {
      neighbors = (current as GraphNode<T>).neighbors;
    } else {
      neighbors = (current as Node<T>).children.map(child => child.value);
    }

    // Explore neighbors
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        
        if (isGraphNode) {
          // For graph nodes, we need to look up the actual neighbor node
          // This assumes you have a way to get the full neighbor node
          const neighborNode = getGraphNodeById(neighbor); // You'll need to implement this
          if (neighborNode) {
            queue.push({ ...neighborNode, depth: currentDepth + 1 });
          }
        } else {
          // For tree nodes, assume we can find the child node
          const childNode = findChildNode(startNode, neighbor, currentDepth + 1);
          if (childNode) {
            queue.push(childNode);
          }
        }
      }
    }
  }

  return {
    path: [],
    found: false,
    depth: limit
  };
}

// Helper function to find child node in tree structure
function findChildNode<T>(
  root: Node<T>, 
  targetValue: T, 
  depth: number
): Node<T> & { depth: number } | null {
  function search(node: Node<T>, currentDepth: number): Node<T> & { depth: number } | null {
    if (node.value === targetValue && currentDepth === depth) {
      return { ...node, depth };
    }
    
    if (currentDepth >= depth) return null;
    
    for (const child of node.children) {
      const result = search(child, currentDepth + 1);
      if (result) return result;
    }
    
    return null;
  }
  
  return search(root, 0);
}

// For graph nodes - you'll need to implement this based on your graph structure
function getGraphNodeById<T>(id: T): GraphNode<T> | null {
  // This is a placeholder - implement based on your graph representation
  // For example, if you have a global graph object:
  // return graph[id] || null;
  return null;
}

// Example usage with tree structure
function exampleTreeSearch() {
  // Create a sample tree
  const root: Node<string> = {
    value: 'A',
    children: [
      {
        value: 'B',
        children: [
          { value: 'D', children: [] },
          { value: 'E', children: [] }
        ]
      },
      {
        value: 'C',
        children: [
          { value: 'F', children: [
            { value: 'G', children: [] },
            { value: 'H', children: [] }
          ]},
          { value: 'I', children: [] }
        ]
      }
    ]
  };

  const result = breadthLimitedSearch(root, 'G', 3);
  
  if (result) {
    console.log(`Found: ${result.found}`);
    console.log(`Depth reached: ${result.depth}`);
    console.log(`Path: ${result.path.join(' -> ')}`);
  }
}

// Example usage with graph structure
function exampleGraphSearch() {
  // Sample graph represented as adjacency list
  const graph: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F', 'I'],
    'D': [],
    'E': [],
    'F': ['G', 'H'],
    'G': [],
    'H': [],
    'I': []
  };

  // Create a graph node for starting point
  const startNode: GraphNode<string> = {
    id: 'A',
    neighbors: graph['A']
  };

  // Note: For a full graph implementation, you'd need to pass the entire graph
  // and modify the algorithm to use the adjacency list directly
  console.log('Graph search would need additional implementation for full functionality');
}

// More complete graph implementation
function breadthLimitedGraphSearch<T>(
  startId: T,
  goalId: T,
  graph: Record<T, T[]>,
  limit: number
): { path: T[], found: boolean, depth: number } | null {
  const visited = new Set<T>();
  const queue: Array<{ id: T; depth: number; path: T[] }> = [
    { id: startId, depth: 0, path: [startId] }
  ];
  visited.add(startId);

  while (queue.length > 0) {
    const { id, depth, path } = queue.shift()!;

    if (id === goalId) {
      return { path, found: true, depth };
    }

    if (depth >= limit) continue;

    const neighbors = graph[id] || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ id: neighbor, depth: depth + 1, path: [...path, neighbor] });
      }
    }
  }

  return { path: [], found: false, depth: limit };
}

// Example of the complete graph search
function runGraphExample() {
  const graph: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F', 'I'],
    'D': [],
    'E': [],
    'F': ['G', 'H'],
    'G': [],
    'H': [],
    'I': []
  };

  const result = breadthLimitedGraphSearch('A', 'G', graph, 3);
  
  if (result) {
    console.log(`Graph search - Found: ${result.found}`);
    console.log(`Depth reached: ${result.depth}`);
    console.log(`Path: ${result.path.join(' -> ')}`);
  }
}

// Run examples
exampleTreeSearch();
runGraphExample();
