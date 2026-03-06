import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "@/components/SearchBar";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <header className="h-14 flex items-center gap-4 border-b border-border px-4 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <Link to="/" className="text-lg font-bold text-primary shrink-0">
        Derpublic
      </Link>

      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      <Button variant="ghost" size="icon" asChild>
        <Link to="/settings">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Link>
      </Button>
    </header>
  );
};

export default AppHeader;
