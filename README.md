# სწავლა+ — კურსების კატალოგი (სტუდენტი 1)

ციფრული განათლების პლატფორმის (EdTech LMS) მოდული: კურსების საძიებო და მრავალდონიანი ფილტრაციის სისტემა.

## გაშვება
```bash
npm install
npm run dev      # განვითარების რეჟიმი
npm run build    # production build (+ TypeScript შემოწმება)
```

## სტრუქტურა
| ფაილი | დანიშნულება |
|---|---|
| `src/types/course.ts` | `interface Course`, `CourseFilters` და დამხმარე ტიპები |
| `src/hooks/useFetchCourses.ts` | Custom Hook: fetch + loading/error/refetch + AbortController |
| `src/components/CourseCatalog.tsx` | კონტეინერი: ფილტრების state, ძიება, დალაგება, ჩიპები |
| `src/components/FilterPanel.tsx` | ფილტრების პანელი (კატეგორია, დონე, ფასი, რეიტინგი) |
| `src/components/CourseCard.tsx` | კურსის ბარათი (props: `course`, `isSaved`, `onToggleSave`) |
| `src/utils/filterCourses.ts` | ფილტრაციისა და დალაგების წმინდა ფუნქცია |
| `src/styles/*.scss` | Tailwind + Sass; მედია-ქვერები `_breakpoints.scss`-ის `up()` / `down()` მიქსინებით |
| `public/courses.json` | კურსების მონაცემები, იტვირთება `fetch`-ით |

## ფილტრაციის დონეები
1. ტექსტური ძიება (დასახელება/ლექტორი, debounce 250 მს)
2. კატეგორია (მრავალჯერადი არჩევა)
3. დონე (მრავალჯერადი არჩევა)
4. ფასი: ყველა / უფასო / ფასიანი + მაქსიმალური ფასის სლაიდერი
5. მინიმალური რეიტინგი
6. დალაგება: პოპულარობა, რეიტინგი, ფასი, ხანგრძლივობა
