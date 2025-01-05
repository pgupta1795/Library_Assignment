'use client';

import {Input} from "@/components/ui/input";
import {useDebounce} from "@/hooks/use-debounce";
import {Search} from "lucide-react";
import {useRouter,useSearchParams} from 'next/navigation';
import {useEffect,useState} from "react";

const RECENT_SEARCHES_KEY='recent-kpi-searches';
const MAX_RECENT_SEARCHES=5;

export default function SearchKPI() {
  const router=useRouter();
  const searchParams=useSearchParams();
  const [query,setQuery]=useState(searchParams.get('search')||'');
  const [recentSearches,setRecentSearches]=useState<string[]>([]);
  const [showRecent,setShowRecent]=useState(false);
  const debouncedQuery=useDebounce(query,300);

  useEffect(() => {
    const stored=localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  },[]);

  useEffect(() => {
    const params=new URLSearchParams(searchParams);
    if (debouncedQuery.trim()) {
      params.set('search',debouncedQuery);
      router.push(`?${params.toString()}`);
      console.log('debouncedQuery ********** ',debouncedQuery);

      setRecentSearches(prevSearches => {
        const newSearches=[
          debouncedQuery,
          ...prevSearches.filter(s => s!==debouncedQuery&&s.trim())
        ].slice(0,MAX_RECENT_SEARCHES);

        localStorage.setItem(RECENT_SEARCHES_KEY,JSON.stringify(newSearches));
        return newSearches;
      });
    } else {
      params.delete('search');
    }
    const newUrl=params.toString()? `?${params.toString()}`:'';
    router.push(newUrl);
  },[debouncedQuery,router,searchParams]);

  const clearRecentSearches=() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    console.log('cleared searches');
  };

  return (
    <div className="relative w-full">
      <Search className="w-5 h-5 absolute left-2 transform translate-y-2 text-gray-500" />
      <Input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!e.target.value.trim()) {
            const params=new URLSearchParams(searchParams);
            params.delete('search');
            router.push(`?${params.toString()}`);
          }
        }}
        onFocus={() => setShowRecent(true)}
        onBlur={() => setTimeout(() => setShowRecent(false),200)}
        placeholder="Search by title or description"
        className="w-full pl-8"
      />

      {showRecent&&recentSearches.length>0&&(
        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg border p-2 z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Recent searches</span>
            <button
              onClick={clearRecentSearches}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          {recentSearches.map((search,i) => (
            <button
              key={i}
              className="flex items-center w-full p-2 text-left hover:bg-gray-100 rounded"
              onClick={() => setQuery(search)}
            >
              <Search className="w-4 h-4 mr-2 text-gray-500" />
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
