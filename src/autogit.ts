from collections import deque

def topological_sort(graph):
    n = len(graph)
    indegree = [0] * n
    topo_order = []
    
    # Calculate indegree for each node
    for node in range(n):
        for neighbor in graph[node]:
            indegree[neighbor] += 1
            
    # Initialize queue with nodes having zero indegree
    q = deque()
    for node in range(n):
        if indegree[node] == 0:
            q.append(node)
            
    # Process nodes
    while q:
        node = q.popleft()
        topo_order.append(node)
        
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
                
    # Check for cycles
    if len(topo_order) != n:
        return None  # Graph has a cycle
        
    return topo_order
