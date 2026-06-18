import { BDI_QUESTIONS } from "@/lib/tests/bdi";

export type AnswerBreakdownItem = {
  questionNumber: number;
  score: number;
  answerText: string;
};

export function getAnswerBreakdown(
  testId: string,
  answers: number[],
): AnswerBreakdownItem[] | null {
  if (testId === "bdi" && answers.length === BDI_QUESTIONS.length) {
    return answers.map((score, index) => {
      const question = BDI_QUESTIONS[index];
      const option = question.options.find((item) => item.score === score);

      return {
        questionNumber: question.id,
        score,
        answerText: option?.text ?? `Балл ${score}`,
      };
    });
  }

  return null;
}
