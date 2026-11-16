import { useMemo, useState } from 'react';
import type { CourseCategory, CourseFilters } from '../types/course';
import { useFetchCourses } from '../hooks/useFetchCourses';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { filterCourses } from '../utils/filterCourses';
import {
  CATEGORY_LABELS,
  DEFAULT_FILTERS,
  LEVEL_LABELS,
  MAX_PRICE,
  SORT_LABELS,
  formatPrice,
} from '../utils/labels';
import CourseCard from './CourseCard';
import FilterPanel from './FilterPanel';

const COURSES_URL = `${import.meta.env.BASE_URL}courses.json`;

interface Chip {
  key: string;
  label: string;
  remove: () => void;
}

export default function CourseCatalog() {
  const { courses, loading, error, refetch } = useFetchCourses(COURSES_URL);
  const [filters, setFilters] = useState<CourseFilters>(DEFAULT_FILTERS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const debouncedQuery = useDebouncedValue(filters.query, 250);

  const visible = useMemo(
    () => filterCourses(courses, { ...filters, query: debouncedQuery }),
    [courses, filters, debouncedQuery],
  );

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CourseCategory, number>;
    for (const c of courses) counts[c.category] = (counts[c.category] ?? 0) + 1;
    return counts;
  }, [courses]);

  const patch = (p: Partial<CourseFilters>) => setFilters((prev) => ({ ...prev, ...p }));
  const reset = () => setFilters(DEFAULT_FILTERS);

  const toggleSave = (id: number) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const chips: Chip[] = [
    ...filters.categories.map((c) => ({
      key: `cat-${c}`,
      label: CATEGORY_LABELS[c],
      remove: () => patch({ categories: filters.categories.filter((x) => x !== c) }),
    })),
    ...filters.levels.map((l) => ({
      key: `lvl-${l}`,
      label: LEVEL_LABELS[l],
      remove: () => patch({ levels: filters.levels.filter((x) => x !== l) }),
    })),
  ];
  if (filters.priceMode !== 'all')
    chips.push({
      key: 'price-mode',
      label: filters.priceMode === 'free' ? 'უფასო' : 'ფასიანი',
      remove: () => patch({ priceMode: 'all' }),
    });
  if (filters.maxPrice < MAX_PRICE)
    chips.push({
      key: 'max-price',
      label: `მაქს. ${formatPrice(filters.maxPrice)}`,
      remove: () => patch({ maxPrice: MAX_PRICE }),
    });
  if (filters.minRating > 0)
    chips.push({
      key: 'rating',
      label: `რეიტინგი ${filters.minRating}+`,
      remove: () => patch({ minRating: 0 }),
    });

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <header className="catalog__header">
        <div>
          <h1 id="catalog-title" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            კურსების კატალოგი
          </h1>
          <p className="mt-2 max-w-xl text-ink/70">
            მოძებნე კურსი თემით, დონით, ფასითა და რეიტინგით.
          </p>
        </div>
      </header>

      <div className="catalog__toolbar">
        <label className="sr-only" htmlFor="search">
          ძიება
        </label>
        <input
          id="search"
          type="search"
          value={filters.query}
          onChange={(e) => patch({ query: e.target.value })}
          placeholder="კურსის ან ლექტორის სახელი"
          className="field flex-1"
        />

        <label className="sr-only" htmlFor="sort">
          დალაგება
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => patch({ sort: e.target.value as CourseFilters['sort'] })}
          className="field"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn-ghost catalog__filter-toggle"
          aria-expanded={panelOpen}
          aria-controls="filter-panel"
          onClick={() => setPanelOpen((o) => !o)}
        >
          ფილტრები{chips.length > 0 ? ` (${chips.length})` : ''}
        </button>
      </div>

      <div className="catalog__body">
        <aside id="filter-panel" className={`catalog__sidebar ${panelOpen ? 'is-open' : ''}`}>
          <FilterPanel filters={filters} categoryCounts={categoryCounts} onChange={patch} onReset={reset} />
        </aside>

        <div className="min-w-0">
          {chips.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-2" aria-label="აქტიური ფილტრები">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button type="button" className="chip" onClick={chip.remove} aria-label={`წაშლა: ${chip.label}`}>
                    {chip.label} <span aria-hidden="true">×</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {loading && (
            <div className="course-grid" aria-busy="true" aria-live="polite">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div role="alert" className="state-box">
              <p className="font-semibold text-ember">კურსები ვერ ჩაიტვირთა</p>
              <p className="mt-1 text-sm text-ink/70">{error}</p>
              <button type="button" className="btn-primary mt-4" onClick={refetch}>
                ხელახლა ცდა
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="mb-4 text-sm text-ink/70" aria-live="polite">
                ნაპოვნია <strong className="text-ink">{visible.length}</strong> კურსი {courses.length}-დან
              </p>

              {visible.length === 0 ? (
                <div className="state-box">
                  <p className="font-semibold text-ink">არცერთი კურსი არ ემთხვევა არჩეულ პირობებს</p>
                  <p className="mt-1 text-sm text-ink/70">მოხსენი რომელიმე ფილტრი ან შეცვალე საძიებო სიტყვა.</p>
                  <button type="button" className="btn-primary mt-4" onClick={reset}>
                    ფილტრების გასუფთავება
                  </button>
                </div>
              ) : (
                <div className="course-grid">
                  {visible.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isSaved={saved.has(course.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
