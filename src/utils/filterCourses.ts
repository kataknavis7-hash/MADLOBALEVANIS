import type { Course, CourseFilters } from '../types/course';

const normalize = (s: string) => s.toLocaleLowerCase('ka').trim();

/** მრავალდონიანი ფილტრაცია: ძიება → კატეგორია → დონე → ფასი → რეიტინგი → დახარისხება */
export function filterCourses(courses: Course[], f: CourseFilters): Course[] {
  const q = normalize(f.query);

  const result = courses.filter((c) => {
    if (q && !normalize(`${c.title} ${c.instructor}`).includes(q)) return false;
    if (f.categories.length > 0 && !f.categories.includes(c.category)) return false;
    if (f.levels.length > 0 && !f.levels.includes(c.level)) return false;
    if (f.priceMode === 'free' && c.price !== 0) return false;
    if (f.priceMode === 'paid' && c.price === 0) return false;
    if (c.price > f.maxPrice) return false;
    if (c.rating < f.minRating) return false;
    return true;
  });

  const sorted = [...result];
  switch (f.sort) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
      break;
    case 'priceAsc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'duration':
      sorted.sort((a, b) => b.durationHours - a.durationHours);
      break;
    default:
      sorted.sort((a, b) => b.ratingCount - a.ratingCount);
  }
  return sorted;
}
