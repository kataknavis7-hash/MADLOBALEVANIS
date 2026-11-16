export const courses = [
  {
    id: 'web-basics',
    title: 'ვებ-დეველოპმენტის საფუძვლები',
    level: 'დამწყები',
    hours: 12,
    lessons: [
      { id: 'w1', title: 'HTML სტრუქტურა' },
      { id: 'w2', title: 'CSS განლაგება: Flexbox და Grid' },
      { id: 'w3', title: 'JavaScript ცვლადები და ფუნქციები' },
      { id: 'w4', title: 'DOM-თან მუშაობა' },
      { id: 'w5', title: 'რესპონსიული დიზაინი' },
      { id: 'w6', title: 'საბოლოო პროექტი' },
    ],
  },
  {
    id: 'react-pro',
    title: 'React პრაქტიკაში',
    level: 'საშუალო',
    hours: 18,
    lessons: [
      { id: 'r1', title: 'კომპონენტები და Props' },
      { id: 'r2', title: 'State და Hooks' },
      { id: 'r3', title: 'Custom Hooks' },
      { id: 'r4', title: 'Routing და Lazy Loading' },
      { id: 'r5', title: 'ოპტიმიზაცია და Lighthouse' },
    ],
  },
  {
    id: 'data-literacy',
    title: 'მონაცემთა წიგნიერება',
    level: 'დამწყები',
    hours: 8,
    lessons: [
      { id: 'd1', title: 'რა არის მონაცემი' },
      { id: 'd2', title: 'ცხრილები და გრაფიკები' },
      { id: 'd3', title: 'საბაზისო სტატისტიკა' },
      { id: 'd4', title: 'მონაცემების ვიზუალიზაცია' },
    ],
  },
]

export const achievementDefs = [
  { id: 'first', title: 'პირველი ნაბიჯი', hint: 'დაასრულე 1 გაკვეთილი', test: (s) => s.totalDone >= 1 },
  { id: 'five', title: 'რიტმში', hint: 'დაასრულე 5 გაკვეთილი', test: (s) => s.totalDone >= 5 },
  { id: 'half', title: 'ნახევარი გზა', hint: 'მიაღწიე 50% საერთო პროგრესს', test: (s) => s.percent >= 50 },
  { id: 'course', title: 'კურსდამთავრებული', hint: 'სრულად დაასრულე ერთი კურსი', test: (s) => s.completedCourses >= 1 },
  { id: 'all', title: 'სრული გზა', hint: 'დაასრულე ყველა კურსი', test: (s) => s.completedCourses === s.courseCount },
]
