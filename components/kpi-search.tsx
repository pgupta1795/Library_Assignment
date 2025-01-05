import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchKPI() {
  return (
    <div className="relative w-full">
      <Search className="w-5 h-5 absolute left-2 transform translate-y-2 text-gray-500" />
      <Input
        type="search"
        placeholder="Type to search"
        className="w-full pl-8"
      />
    </div>
  );
}
