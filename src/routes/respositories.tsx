import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/respositories")({
  component: Repositories,
});

function Repositories() {
  return <div className="p-2">Hello from Repositories!</div>;
}
