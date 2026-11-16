# სწავლის პორტალი (EdTech LMS)

React 18 + Vite 5 + React Router 6.

## გაშვება
```bash
npm install
npm run dev       # დეველოპმენტი
npm run build     # production build (dist/)
npm run preview   # build-ის შემოწმება, Lighthouse-ისთვის გამოიყენე ეს
```

## სტრუქტურა
- `src/hooks/useStudentProgress.js` — custom hook: პროგრესი, ანალიტიკა, მიღწევები (localStorage-ში ინახება)
- `src/components/ProgressDashboard.jsx` — პროგრეს-ბარები
- `src/components/AchievementBoard.jsx` — მიღწევების დაფა
- `src/components/CertificateModal.jsx` — მოდალი `children` prop-ით; `CertificateFlow.jsx` ავსებს სერტიფიკატით და PNG-ის გენერაციით

## ოპტიმიზაცია (Lighthouse)
- Code splitting: გვერდები `React.lazy`-ით, vendor chunk-ები `vite.config.js`-ში
- სერტიფიკატის მოდალი იტვირთება მხოლოდ კურსის დასრულების შემდეგ
- `preconnect` + `font-display=swap`, `lang="ka"`, meta description, a11y (ARIA, focus, skip-link, reduced-motion)

## Git Workflow
- `main` — სტაბილური, release; `develop` — ინტეგრაცია
- `feature/<სახელი>` იქმნება `develop`-იდან, ბრუნდება PR/merge-ით (`--no-ff`)
- Conventional Commits: `feat:`, `fix:`, `perf:`, `docs:`, `chore:`
- `release/x.y.z` → merge `main`-ში + tag
