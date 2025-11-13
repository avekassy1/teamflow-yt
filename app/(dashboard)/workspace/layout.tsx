import { ReactNode } from "react";
import { WorkspaceList } from "./_components/WorkspaceList";
import { CreateWorkspace } from "./_components/CreateWorkspace";
import { UserNav } from "./_components/UserNav";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc"

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspace", "list"],
    queryFn: () => orpc.workspace.list(),
  });
  // await queryClient.prefetchQuery(orpc.workspace.list.getQuery()); // getQuery doesn't work - not defined

  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-center bg-secondary px-2 py-3 border-r border-border">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>
        <div className="mt-4">
          <CreateWorkspace />
        </div>
        <div className="mt-auto">
          <UserNav />
        </div>
      </div>
      {children}
    </div>
  );
};

export default WorkspaceLayout;
