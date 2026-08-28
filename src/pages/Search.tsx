import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import SearchBar from "../components/search/SearchBar";
import SearchFilters from "../components/search/SearchFilters";
import SearchResults from "../components/search/SearchResults";
import { getAllCourses } from "../lib/catalog";
import { searchLessons, type SearchFilters as Filters } from "../lib/search";
import { useProgress } from "../hooks/useUserData";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState<Filters>({ status: "all" });
  const { getProgress } = useProgress();
  const courses = getAllCourses();

  const results = useMemo(
    () => searchLessons(query, filters, getProgress),
    [query, filters, getProgress]
  );

  function handleSearch(q: string) {
    setQuery(q);
    setParams(q ? { q } : {});
  }

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Tìm kiếm" }]} />
      <h1 className="text-2xl font-display font-bold text-ash-200">Tìm kiếm</h1>

      <SearchBar initialValue={query} onSearch={handleSearch} size="hero" />
      <SearchFilters courses={courses} filters={filters} onChange={setFilters} />
      <SearchResults results={results} query={query} />
    </div>
  );
}
