import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row">
      <div className="fixed w-16 flex-none sm:w-16 lg:w-52">
        <SideNav />
      </div>
      <div className="w-16 flex-none sm:w-16 lg:w-52">
        {/* temporary fix, idk how else to make the sidebar stay when scrolling */}
      </div>
      <div className="vh-100 flex-grow overflow-auto bg-gray-200 p-4">
        {children}
      </div>
    </div>
  );
}
