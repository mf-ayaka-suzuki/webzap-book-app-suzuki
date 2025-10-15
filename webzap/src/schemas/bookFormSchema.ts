import { z } from 'zod';

const errorMessages = {
  required: '必須項目です',
  title: {
    min: '書籍タイトルを入力してください',
    max: '書籍タイトルは50文字以内で入力してください',
  },
  author: {
    min: '著者名を入力してください',
    max: '著者名は30文字以内で入力してください',
  },
  rating: {
    min: '評価は1以上で選択してください',
    max: '評価は5以下で選択してください',
  },
};

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, errorMessages.title.min)
    .max(50, errorMessages.title.max)
    .trim(),
  author: z
    .string()
    .min(1, errorMessages.author.min)
    .max(30, errorMessages.author.max)
    .trim(),
  rating: z
    .number()
    .min(1, errorMessages.rating.min)
    .max(5, errorMessages.rating.max),
});

export type BookFormValues = z.infer<typeof bookSchema>;
