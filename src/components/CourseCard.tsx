import type { Course } from '../types/course';
import { CATEGORY_GLYPHS, CATEGORY_LABELS, LEVEL_LABELS, formatPrice } from '../utils/labels';

interface CourseCardProps {
  course: Course;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
}

export default function CourseCard({ course, isSaved, onToggleSave }: CourseCardProps) {
  const { id, title, instructor, category, level, price, rating, ratingCount, lessons, durationHours, thumbnailHue } =
    course;

  const thumbStyle = {
    background: `linear-gradient(135deg, hsl(${thumbnailHue} 55% 24%), hsl(${(thumbnailHue + 35) % 360} 65% 42%))`,
  };

  return (
    <article className="course-card">
      <div className="course-card__thumb" style={thumbStyle} aria-hidden="true">
        <span className="course-card__glyph">{CATEGORY_GLYPHS[category]}</span>
        <span className="course-card__category">{CATEGORY_LABELS[category]}</span>
      </div>

      <button
        type="button"
        className="course-card__save"
        onClick={() => onToggleSave(id)}
        aria-pressed={isSaved}
        aria-label={isSaved ? `ამოშლა შენახულიდან: ${title}` : `შენახვა: ${title}`}
      >
        {isSaved ? '★' : '☆'}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">{title}</h3>
        <p className="text-sm text-ink/70">{instructor}</p>

        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          <span className="text-signal" aria-hidden="true">★</span>
          <span className="text-ink/60">({ratingCount.toLocaleString('ka')})</span>
        </div>

        <p className="text-sm text-ink/70">
          {LEVEL_LABELS[level]}, {lessons} გაკვეთილი, {durationHours} სთ
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className={price === 0 ? 'font-bold text-teal-dark' : 'font-bold text-ink'}>
            {formatPrice(price)}
          </span>
          <button type="button" className="btn-primary">
            დეტალები
          </button>
        </div>
      </div>
    </article>
  );
}
