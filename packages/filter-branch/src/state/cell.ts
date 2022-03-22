export type CellType = "code" | "text";
export type Direction = "up" | "down";
export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
