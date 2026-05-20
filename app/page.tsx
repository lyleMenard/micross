'use client';
import Image from "next/image";
import { useState } from 'react';

enum CellState { Empty, Solid, Marked };

interface CellProps {
  state: CellState;
  onSquareClick: () => void;
}

function Cell({ state, onSquareClick }: CellProps) {
  return (
    <button className="cell" onClick={onSquareClick}>
      {state}
    </button>
  )
}

interface PuzzleGridProps {
  rowDefinitions: number[][];
  columnDefinitions: number[][];
  puzzleState: CellState[][];
  onMove: (newState: CellState[][]) => void;
}

function PuzzleGrid({ rowDefinitions, columnDefinitions, puzzleState, onMove }: PuzzleGridProps) {
  function handleClick(row: number, column: number) {
    console.log("handleClick at ", row, column)
    let newPuzzleState = [...puzzleState];
    newPuzzleState[row][column] = CellState.Solid;
    onMove(newPuzzleState);
  }
  return <div className="grid" style={{ gridTemplateColumns: `repeat(${columnDefinitions.length}, 1fr)` }}>
    {rowDefinitions.map((rowDefinition, rowIndex) =>
      columnDefinitions.map((columnDefinition, columnIndex) =>
        <Cell state={puzzleState[rowIndex][columnIndex]} onSquareClick={() => handleClick(rowIndex, columnIndex)} key={`${rowIndex}-${columnIndex}`} />
      )
    )}
  </div>
}


export default function Puzzle() {
  function handleMove(newState: CellState[][]) {
    console.log("setting new state");
    setPuzzleState(newState);
  }

  const puzzleWidth = 15;
  const puzzleHeight = 15;
  const puzzleSolution = [
    [[15], [4, 5], [2, 4], [1, 3], [2], [2], [2, 4, 3], [2, 6, 2], [2, 1, 6, 2], [2, 1, 1, 4, 2], [1, 1], [1, 3, 2, 1], [2, 2, 1, 2, 1], [3, 3, 2, 1], [9]],
    [[4, 4], [3, 1, 2, 3], [2, 1, 2, 2], [2, 1, 1], [1, 4, 2], [1, 3], [1, 8], [1, 3, 1, 1], [1, 4, 2, 1], [1, 4], [2, 4, 3], [3, 3, 3], [4, 1], [10, 3], [10]]
  ];
  const [puzzleState, setPuzzleState] = useState<CellState[][]>(
    Array(puzzleWidth).fill(null).map(() => Array(puzzleHeight).fill(CellState.Empty))
  );

  return (
    <div className="puzzle">
      <div className="puzzle-grid">
        <PuzzleGrid rowDefinitions={puzzleSolution[0]} columnDefinitions={puzzleSolution[1]} puzzleState={puzzleState} onMove={handleMove} />
      </div>
    </div>
  );
}
