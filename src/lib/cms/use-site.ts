import { getRouteApi } from "@tanstack/react-router";
import type { Site } from "./types";

const rootApi = getRouteApi("__root__");

export function useSite(): Site {
  return rootApi.useRouteContext().site;
}
