import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Layout from "./Layout";

const Header = () => {
  return (
    <Layout>
      <div className="flex flex-row gap-4 justify-between items-center w-full">
        <div>
          <Link href={"/"} className="font-bold text-xl tracking-tighter">
            budget
          </Link>
        </div>
        <div className="flex flex-row gap-6 font-bold tracking-tighter">
          <Link href={"/transactions"} className="hover:text-white/70">
            transactions
          </Link>
          <Link href={"/budgets"} className="hover:text-white/70">
            budgets
          </Link>
          <Link href={"/reports"} className="hover:text-white/70">
            reports/insights
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </div>
      </div>
    </Layout>
  );
};
export default Header;
