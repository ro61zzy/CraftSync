import { ReactNode } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="text-lg hover:underline">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard/projects" className="text-lg hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tasks" className="text-lg hover:underline">
                Tasks
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
