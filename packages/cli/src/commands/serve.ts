import { Command } from "commander";
import { serve } from "@pkgrat/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "pack.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        Number(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(`Opened ${filename} at http://localhost:${options.port}`);
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.error(
          "Port already in use. Try running on a different port by using --port=PORT-NUMBER."
        );
      } else {
        console.error(
          "Yikes! There was a problem starting the server!",
          err.message
        );
      }
      process.exit(1);
    }
  });
