'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CalendarDays, Check, Clock3, Users } from 'lucide-react';

import { enrollStudent, formatParticipants } from '@/lib/enrollment';

const courses = [
  {
    title: 'Основы веб-разработки',
    description:
      'HTML, CSS и JavaScript на практике: от первой страницы до небольшого приложения.',
    teacher: 'Анна Петрова',
    duration: '6 недель',
    start: '16 сентября',
    accent: 'blue',
  },
  {
    title: 'UX-дизайн для начинающих',
    description:
      'Исследование пользователей, прототипы и понятные интерфейсы без лишней сложности.',
    teacher: 'Илья Соколов',
    duration: '5 недель',
    start: '23 сентября',
    accent: 'violet',
  },
  {
    title: 'SQL для аналитиков',
    description:
      'Запросы, группировки и работа с данными на примерах из продуктовой аналитики.',
    teacher: 'Мария Волкова',
    duration: '4 недели',
    start: '30 сентября',
    accent: 'teal',
  },
] as const;

export function CoursePortal() {
  const [participants, setParticipants] = useState(10);
  const [enrolled, setEnrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setIsReady(true), 0);
    return () => window.clearTimeout(readyTimer);
  }, []);

  function handleEnrollment() {
    setParticipants((current) => enrollStudent(current));
    setEnrolled(true);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="page-shell flex h-16 items-center justify-between gap-6">
          <a
            href="#catalog"
            className="flex items-center gap-2.5 font-semibold text-slate-950"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            Учебный портал
          </a>
          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-6 text-sm text-slate-600 sm:flex"
          >
            <a className="font-medium text-blue-700" href="#catalog">
              Каталог курсов
            </a>
            <a className="transition hover:text-slate-950" href="#my-learning">
              Моё обучение
            </a>
          </nav>
        </div>
      </header>

      <div className="page-shell py-10 sm:py-14">
        <section className="mb-9 max-w-2xl" aria-labelledby="page-title">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            Осенний набор открыт
          </p>
          <h1
            id="page-title"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Выберите курс и начните учиться
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Короткие практические программы с поддержкой преподавателя и
            понятным расписанием.
          </p>
        </section>

        <section id="catalog" aria-labelledby="catalog-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2
                id="catalog-title"
                className="text-xl font-bold text-slate-950"
              >
                Ближайшие курсы
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Три программы для старта этой осенью
              </p>
            </div>
            <span className="hidden text-sm text-slate-500 sm:block">
              3 курса
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {courses.map((course, index) => (
              <article key={course.title} className="course-card">
                <div
                  className={`course-mark course-mark-${course.accent}`}
                  aria-hidden="true"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Курс {index + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-bold leading-7 text-slate-950">
                    {course.title}
                  </h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Users
                        className="size-4 text-slate-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Преподаватель</dt>
                      <dd className="text-slate-700">{course.teacher}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock3
                        className="size-4 text-slate-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Продолжительность</dt>
                      <dd className="text-slate-700">{course.duration}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CalendarDays
                        className="size-4 text-slate-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Начало</dt>
                      <dd className="text-slate-700">Начало: {course.start}</dd>
                    </div>
                  </dl>

                  {index === 0 ? (
                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Уже записались</span>
                        <strong
                          data-testid="participant-count"
                          className="font-semibold text-slate-800"
                        >
                          {formatParticipants(participants)}
                        </strong>
                      </div>
                      <button
                        type="button"
                        disabled={!isReady || enrolled}
                        onClick={handleEnrollment}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-300 disabled:cursor-default disabled:bg-emerald-600"
                      >
                        {enrolled ? <Check aria-hidden="true" /> : null}
                        {enrolled ? 'Вы записаны' : 'Записаться на курс'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="mt-6 h-11 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-400"
                      disabled
                    >
                      Запись скоро откроется
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="my-learning"
          className="mt-10 rounded-xl border border-blue-100 bg-blue-50 px-6 py-5"
        >
          <h2 className="font-semibold text-slate-900">Моё обучение</h2>
          <p className="mt-1 text-sm text-slate-600">
            После записи выбранный курс появится здесь. Материалы откроются в
            день начала.
          </p>
        </section>
      </div>
    </main>
  );
}
