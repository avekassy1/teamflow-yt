import { ReactNode } from "react";
import { CreateWorkspace } from "./_components/CreateWorkspace";
import { UserNav } from "./_components/UserNav";
import { WorkspaceList } from "./_components/WorkspaceList";

const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col items-center bg-secondary px-2 py-3 border-r border-border">
        <WorkspaceList />
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
