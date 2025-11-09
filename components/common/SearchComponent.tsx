import { Search } from "lucide-react";

export default function SearchComponent() {
  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        placeholder="Buscar"
        className="w-[230px] p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10" />
    </div>
  );
}
