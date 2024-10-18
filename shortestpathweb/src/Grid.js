import React, { useState } from 'react';
import './App.css'; // Add your CSS for styling

const Grid = () => {
  const rows = 20;
  const cols = 20;
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);
  const fetchPath = async (start, end) => {
    const url = `http://localhost:8000/get-path?start=${start}&end=${end}`;

    // const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     // body: JSON.stringify({ start, end }),
    // });
    // const responseData = await response.json();
    // const formattedPath = responseData?.data?.map(([row, col]) => ({ row, col }));
    // setPath(formattedPath); // Assuming the response has the path in `data.path`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const formattedPath = responseData?.data?.map(([row, col]) => ({ row, col }));
        setPath(formattedPath); // Assuming the response has the path in `data.path`
    } catch (error) {
        console.error("Failed to fetch the path:", error);
        // You can also set an error state here to display a user-friendly message
        // setError(error.message);
    }
};

const isStart = (row, col) => start && start.row === row && start.col === col;
const isEnd = (row, col) => end && end.row === row && end.col === col;
const isPath = (row, col) => path.some(p => p.row === row && p.col === col);
const handleClick = (row, col) => {
    if (!start) {
        setStart({ row, col });
    } else if (!end) {
        setEnd({ row, col });
        const newStart = [start.row, start.col];
        const newEnd = [row, col];
        fetchPath(newStart, newEnd);
    }
};
const predefinedObstacles = [
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 5, col: 7 },
    { row: 10, col: 10 },
    { row: 15, col: 15 },
];
const isObstacle = (row, col) => predefinedObstacles.some(o => o.row === row && o.col === col);

  return (
    <div className="grid">
        <h2>grid 20*20 Tiles</h2>
        <div>
            <button
            onClick={()=>{
                setStart()
                setEnd()
                setPath([])
            }}
            >Reset</button>
        </div>
        <p>{path?.length? "Select Different Points":start?.row?"Enter Destination Point":"Enter Start Point"}</p>
    {Array?.from({ length: rows }).map((_, rowIndex) => (
        <div className="row" key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                    key={colIndex}
                    className={`cell ${isStart(rowIndex, colIndex) ? 'start' : ''} 
                                   ${isEnd(rowIndex, colIndex) ? 'end' : ''} 
                                   ${isPath(rowIndex, colIndex) ? 'path' : ''}
                                ${isObstacle(rowIndex, colIndex) ? 'obstacle' : ''}`}
                    onClick={() => handleClick(rowIndex, colIndex)}
                />
            ))}
        </div>
    ))}
</div>
  );
};

export default Grid;
