import { Link } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import {
  ChevronRightIcon,
  Code2Icon,
  FilterIcon,
  SearchIcon,
  TrophyIcon,
  TargetIcon,
  ZapIcon,
  BookOpenIcon,
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { motion } from "framer-motion";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter problems based on difficulty and search
  const filteredProblems = problems.filter((problem) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;
  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;
  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  const difficultyFilters = [
    { label: "All", count: problems.length, icon: BookOpenIcon },
    { label: "Easy", count: easyProblemsCount, icon: ZapIcon },
    { label: "Medium", count: mediumProblemsCount, icon: TargetIcon },
    { label: "Hard", count: hardProblemsCount, icon: TrophyIcon },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-100 border-b border-base-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Code2Icon className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black">
                  Coding Challenges
                </h1>
                <p className="text-base-content/60 mt-1">
                  Master algorithms and data structures
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {difficultyFilters.map((filter, index) => {
                const Icon = filter.icon;
                return (
                  <motion.div
                    key={filter.label}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-black">{filter.count}</div>
                        <div className="text-xs text-base-content/60">
                          {filter.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters and Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
              <input
                type="text"
                placeholder="Search problems by title or category..."
                className="input input-bordered w-full pl-12 bg-base-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Difficulty Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 bg-base-100 rounded-lg border border-base-300">
                <FilterIcon className="size-4 text-base-content/60" />
                <span className="text-sm font-semibold text-base-content/60">
                  Filter:
                </span>
              </div>
              {difficultyFilters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => setSelectedDifficulty(filter.label)}
                  className={`btn btn-sm ${
                    selectedDifficulty === filter.label
                      ? "btn-primary"
                      : "btn-ghost"
                  }`}>
                  {filter.label}
                  <span className="badge badge-sm ml-1">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDifficulty !== "All" || searchQuery) && (
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className="text-base-content/60">Showing:</span>
              {searchQuery && (
                <span className="badge badge-ghost">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedDifficulty !== "All" && (
                <span className="badge badge-primary">
                  {selectedDifficulty} Problems
                </span>
              )}
              <span className="text-base-content/60">
                ({filteredProblems.length} results)
              </span>
              <button
                onClick={() => {
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
                className="btn btn-ghost btn-xs ml-2">
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Link
                  to={`/problem/${problem.id}`}
                  className="block group">
                  <div className="card bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    <div className="card-body p-6">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Side */}
                        <div className="flex gap-4 flex-1 min-w-0">
                          <div className="size-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Code2Icon className="size-6 text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {problem.title}
                              </h2>
                              <span
                                className={`badge badge-sm ${getDifficultyBadgeClass(
                                  problem.difficulty
                                )}`}>
                                {problem.difficulty}
                              </span>
                            </div>

                            <p className="text-sm text-base-content/60 mb-3">
                              {problem.category}
                            </p>

                            <p className="text-base-content/80 line-clamp-2">
                              {problem.description.text}
                            </p>
                          </div>
                        </div>

                        {/* Right Side - Arrow */}
                        <div className="flex items-center gap-2 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform">
                          <span className="font-semibold hidden sm:inline">
                            Solve
                          </span>
                          <ChevronRightIcon className="size-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}>
              <div className="size-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <SearchIcon className="size-10 text-primary/50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Problems Found</h3>
              <p className="text-base-content/60 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
                className="btn btn-primary">
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Bottom Stats Summary */}
        {filteredProblems.length > 0 && (
          <motion.div
            className="mt-12 card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="card-body">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-primary mb-1">
                    {problems.length}
                  </div>
                  <div className="text-sm text-base-content/60">
                    Total Problems
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-success mb-1">
                    {easyProblemsCount}
                  </div>
                  <div className="text-sm text-base-content/60">Easy</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-warning mb-1">
                    {mediumProblemsCount}
                  </div>
                  <div className="text-sm text-base-content/60">Medium</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-error mb-1">
                    {hardProblemsCount}
                  </div>
                  <div className="text-sm text-base-content/60">Hard</div>
                </div>
              </div>

              <div className="divider" />

              <div className="text-center">
                <p className="text-base-content/70">
                  🎯 Complete all problems to master data structures and
                  algorithms
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProblemsPage;