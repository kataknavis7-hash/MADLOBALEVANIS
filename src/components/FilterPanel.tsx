import type { CourseCategory, CourseFilters, CourseLevel, PriceMode } from '../types/course';
import { CATEGORY_LABELS, LEVEL_LABELS, MAX_PRICE, formatPrice } from '../utils/labels';

interface FilterPanelProps {
  filters: CourseFilters;
  categoryCounts: Record<CourseCategory, number>;
  onChange: (patch: Partial<CourseFilters>) => void;
  onReset: () => void;
}

const PRICE_MODES: { value: PriceMode; label: string }[] = [
  { value: 'all', label: 'ყველა' },
  { value: 'free', label: 'უფასო' },
  { value: 'paid', label: 'ფასიანი' },
];

const RATINGS = [0, 4, 4.5, 4.7];

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export default function FilterPanel({ filters, categoryCounts, onChange, onReset }: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="filter-title">კატეგორია</legend>
        <ul className="flex flex-col gap-2">
          {(Object.keys(CATEGORY_LABELS) as CourseCategory[]).map((cat) => (
            <li key={cat}>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => onChange({ categories: toggle(filters.categories, cat) })}
                />
                <span className="flex-1">{CATEGORY_LABELS[cat]}</span>
                <span className="text-xs text-ink/50">{categoryCounts[cat] ?? 0}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="filter-title">დონე</legend>
        <ul className="flex flex-col gap-2">
          {(Object.keys(LEVEL_LABELS) as CourseLevel[]).map((lvl) => (
            <li key={lvl}>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={filters.levels.includes(lvl)}
                  onChange={() => onChange({ levels: toggle(filters.levels, lvl) })}
                />
                <span className="flex-1">{LEVEL_LABELS[lvl]}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="filter-title">ფასი</legend>
        <div className="segmented" role="radiogroup" aria-label="ფასის ტიპი">
          {PRICE_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              role="radio"
              aria-checked={filters.priceMode === m.value}
              className={filters.priceMode === m.value ? 'is-active' : ''}
              onClick={() => onChange({ priceMode: m.value })}
            >
              {m.label}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm text-ink/80" htmlFor="max-price">
          მაქსიმალური ფასი: <strong>{filters.maxPrice >= MAX_PRICE ? 'ულიმიტო' : formatPrice(filters.maxPrice)}</strong>
        </label>
        <input
          id="max-price"
          type="range"
          min={0}
          max={MAX_PRICE}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="mt-2 w-full accent-teal"
        />
      </fieldset>

      <fieldset>
        <legend className="filter-title">მინიმალური რეიტინგი</legend>
        <div className="segmented" role="radiogroup" aria-label="რეიტინგი">
          {RATINGS.map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={filters.minRating === r}
              className={filters.minRating === r ? 'is-active' : ''}
              onClick={() => onChange({ minRating: r })}
            >
              {r === 0 ? 'ყველა' : `${r}+`}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="btn-ghost" onClick={onReset}>
        ფილტრების გასუფთავება
      </button>
    </div>
  );
}
