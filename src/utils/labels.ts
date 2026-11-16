import type { CourseCategory, CourseFilters, CourseLevel, SortKey } from '../types/course';

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  programming: 'პროგრამირება',
  design: 'დიზაინი',
  business: 'ბიზნესი',
  data: 'მონაცემები',
  languages: 'უცხო ენები',
  marketing: 'მარკეტინგი',
};

export const CATEGORY_GLYPHS: Record<CourseCategory, string> = {
  programming: '</>',
  design: '◐',
  business: '₾',
  data: '∑',
  languages: 'Aa',
  marketing: '◎',
};

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: 'დამწყები',
  intermediate: 'საშუალო',
  advanced: 'მოწინავე',
};

export const SORT_LABELS: Record<SortKey, string> = {
  popular: 'პოპულარობით',
  rating: 'რეიტინგით',
  priceAsc: 'ფასი: ზრდადი',
  priceDesc: 'ფასი: კლებადი',
  duration: 'ხანგრძლივობით',
};

export const MAX_PRICE = 150;

export const DEFAULT_FILTERS: CourseFilters = {
  query: '',
  categories: [],
  levels: [],
  priceMode: 'all',
  maxPrice: MAX_PRICE,
  minRating: 0,
  sort: 'popular',
};

export const formatPrice = (price: number): string => (price === 0 ? 'უფასო' : `${price} ₾`);
