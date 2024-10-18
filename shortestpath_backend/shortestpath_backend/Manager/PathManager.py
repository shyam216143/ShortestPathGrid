


class PathManager:
    @staticmethod
    def is_valid(row, col, grid, visited):
        n = len(grid)
        return 0 <= row < n and 0 <= col < n and grid[row][col] == 1 and not visited[row][col]

    @staticmethod
    def find_short_path(request):
        data = request.query_params
        start = data.get('start')
        end = data.get('end')
        if not (start and end):
            raise Exception('start and end are required')
        source = start.split(",")
        source = (int(source[0]), int(source[1]))
        destination = end.split(",")
        destination = (int(destination[0]), int(destination[1]))
        grid = [[1] * 20 for _ in range(20)]
        obstacles =[(5, 5), (5, 6), (5, 7), (10, 10), (15, 15)]
        for i,j in obstacles:
            grid[i][j] =0
        n = len(grid)
        directions = [(1, 0), (0, 1), (0, -1), (-1, 0)]
        visited = [[False] * n for _ in range(n)]
        parent = [[None] * n for _ in range(n)]
        from collections import  deque
        queue = deque([(source[0], source[1], 0)])
        visited[source[0]][source[1]] = True
        while queue:
            x, y, dist = queue.popleft()
            if (x, y) == destination:
                path = []
                while (x, y) != source:
                    path.append((x, y))
                    x, y = parent[x][y]
                path.append(source)
                path.reverse()
                return path
            for dx, dy in directions:
                new_x, new_y = x + dx, y + dy
                if PathManager().is_valid(new_x, new_y, grid, visited):
                    visited[new_x][new_y] = True
                    parent[new_x][new_y] = (x, y)
                    queue.append((new_x, new_y, dist + 1))
        return None