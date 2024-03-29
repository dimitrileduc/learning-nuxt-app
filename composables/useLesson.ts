import { LessonWithPath } from "@prisma/client";

export default async (chapterSlug: string, lessonSlug: string) =>
  useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
