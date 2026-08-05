import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

const src = docs.toFumadocsSource();
// FIX: fumadocs-mdx returns `files` as a function, but loader expects an array.
// Call `.files()` to get the array of file entries.
export const source = loader({
  baseUrl: "/posts",
  source: {
    // @ts-expect-error - files is a function in the source but loader expects array
    files: src.files(),
  },
}) as ReturnType<typeof loader>;
