export type CourseCategory =
  | 'programming'
  | 'design'
  | 'business'
  | 'data'
  | 'languages'
  | 'marketing';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: CourseCategory;
  level: CourseLevel;
  /** ფასი ლარში; 0 = უფასო */
  price: number;
  rating: number;
  ratingCount: number;
  lessons: number;
  durationHours: number;
  /** HSL ფერის კუთხე ბარათის ვიზუალისთვის */
  thumbnailHue: number;
  description: string;
}

export type PriceMode = 'all' | 'free' | 'paid';
export type SortKey = 'popular' | 'rating' | 'priceAsc' | 'priceDesc' | 'duration';

export interface CourseFilters {
  query: string;
  categories: CourseCategory[];
  levels: CourseLevel[];
  priceMode: PriceMode;
  maxPrice: number;
  minRating: number;
  sort: SortKey;
}
