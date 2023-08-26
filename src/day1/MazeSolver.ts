const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    //1. base case
    //check if we are off the map
    if (
        current.x < 0 ||
        current.x > maze[0].length ||
        current.y < 0 ||
        current.y > maze.length
    )
        return false;

    //check if we walked into a wall
    if (maze[current.y][current.x] === wall) return false;

    //check if we are on the end
    if (current.x === end.x && current.y === end.y) {
        path.push(end);
        return true;
    }

    //check if we've seen this point
    if (seen[current.y][current.x]) return false;

    //pre
    seen[current.y][current.x] = true;
    path.push(current);

    //recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: current.x + x,
                    y: current.y + y,
                },
                end,
                seen,
                path,
            )
        )
            return true;
    }

    //post
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
