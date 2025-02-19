import { db } from "@/db";
import { useQuery } from "@tanstack/react-query";

interface QueryParams {
  weekId: string;
}

export const TASKS_QUERY_KEY = "tasks";

export function useGetTasksQuery({ weekId }: QueryParams) {
  return useQuery({
    queryKey: [TASKS_QUERY_KEY, weekId],
    queryFn: async () => {
      return await db.query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.weekId, weekId),
      });
    },
  });
}
