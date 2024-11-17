import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center py-4 px-20 bg-[linear-gradient(to_right,rgb(23,21,59,_0.7),rgb(46,_35,_108,_0.7),rgb(67,_61,_139,_0.7),rgb(200,_172,_214,_0.7));] ">
      <div>
        <Link
          href={"/"}
          className="text-2xl font-bold tracking-tighter text-white"
        >
          budget
        </Link>
      </div>
      <div className="flex flex-row gap-10 font-bold text-lg tracking-tighter text-white">
        <Link href={"/transactions"}>transactions</Link>
        <Link href={"/budgets"}>budgets</Link>
        <Link href={"/reports"}>reports/insights</Link>
      </div>
      <div className="flex flex-row gap-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
