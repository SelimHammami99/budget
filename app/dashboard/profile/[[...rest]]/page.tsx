import { auth } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

export default async function Page() {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) return null;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="flex flex-row items-center w-full justify-between">
            <h1 className="font-bold text-xl tracking-tighter">Profile</h1>
          </div>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex items-center justify-center w-full">
          <UserProfile />
        </div>
      </div>
    </>
  );
}
