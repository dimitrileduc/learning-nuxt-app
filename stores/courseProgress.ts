import { defineStore } from "pinia";

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = useLocalStorage("progress", {});
  const initialized = ref(false);

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;
  }

  const toogleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    // grab from route if not provied
    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      chapter = chapterSlug as string;
      lesson = lessonSlug as string;
    }

    const currentProgress = progress.value[chapter]?.[lesson];

    console.log("currentProgress", currentProgress);

    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };
  };

  return {
    initialize,
    progress,
    toogleComplete,
  };
});
