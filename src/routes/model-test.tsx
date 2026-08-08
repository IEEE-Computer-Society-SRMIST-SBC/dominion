import { createFileRoute } from "@tanstack/react-router";
import ModelTest from "@/components/dominion/experience/ModelTest";

export const Route = createFileRoute("/model-test")({
  component: ModelTest,
});
