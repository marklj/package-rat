import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, directory: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(directory, filename);
  router.get("/cells", async (request, response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      response.send(JSON.parse(result));
    } catch (error) {
      if (error.code === "ENOENT") {
        fs.writeFile(fullPath, "[]", "utf-8");
        response.send([]);
      } else {
        throw error;
      }
    }
  });
  router.get("/cells", async (request, response) => {
    const { cells }: { cells: Cell[] } = request.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    response.send({ status: "ok" });
  });

  return router;
};
