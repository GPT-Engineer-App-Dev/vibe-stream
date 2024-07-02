import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, Music } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { navItems } from "../App";
import AudioPlayer from "@/components/AudioPlayer";

const Layout = () => {
  const [playlists, setPlaylists] = useState(["My Playlist 1", "My Playlist 2", "My Playlist 3"]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, newPlaylistName.trim()]);
      setNewPlaylistName("");
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar playlists={playlists} newPlaylistName={newPlaylistName} setNewPlaylistName={setNewPlaylistName} handleCreatePlaylist={handleCreatePlaylist} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1">{/* Add nav bar content here! */}</div>
          <UserDropdown />
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

const Sidebar = ({ playlists, newPlaylistName, setNewPlaylistName, handleCreatePlaylist }) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Music className="h-6 w-6" />
          <span>Music Stream</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          {navItems.map((item) => (
            <SidebarNavLink key={item.to} to={item.to}>
              {item.icon}
              {item.title}
            </SidebarNavLink>
          ))}
        </nav>
        <div className="mt-4 px-2 lg:px-4">
          <h3 className="text-xs font-semibold uppercase text-muted-foreground">Playlists</h3>
          <ul className="mt-2 space-y-1">
            {playlists.map((playlist, index) => (
              <li key={index}><NavLink to={`/playlist/${index + 1}`} className="text-sm">{playlist}</NavLink></li>
            ))}
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">Create Playlist</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleCreatePlaylist(); }}>
                <Input
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist Name"
                  className="mb-4"
                />
                <Button type="submit">Create</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
);

const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <Music className="h-6 w-6" />
          <span className="sr-only">Music Stream</span>
        </NavLink>
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} to={item.to}>
            {item.title}
          </SidebarNavLink>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

const UserDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SidebarNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {children}
  </NavLink>
);

const Footer = () => (
  <footer className="flex items-center justify-between p-4 border-t bg-muted/40">
    <AudioPlayer />
  </footer>
);

export default Layout;