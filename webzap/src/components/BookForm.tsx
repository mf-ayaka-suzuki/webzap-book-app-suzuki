'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Rating,
  Stack,
} from '@mui/material';

import { bookSchema, type BookFormValues } from '@/schemas/bookFormSchema';

export default function BookForm() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { title: '', author: '', rating: 3 },
    mode: 'onBlur',
  });

  const onSubmit = async (data: BookFormValues) => {
    const STORAGE_KEY = 'customBooks';

    // 既存のローカル保存データを取得
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const existing: Array<{ title: string; author: string; rating: number; id: number }> = saved ? JSON.parse(saved) : [];

    // 一意なIDを付与（タイムスタンプベースで衝突を避ける）
    const newBook = {
      title: data.title,
      author: data.author,
      rating: data.rating,
      id: Date.now(),
    };

    const updated = [...existing, newBook];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 送信後ホームへリダイレクト
    router.push('/');
  };

  return (
    <Paper elevation={0} sx={{ p: 4, maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        📚 書籍を追加
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Stack spacing={3}>
          {/* 書籍タイトル */}
          <TextField
            label="書籍タイトル *"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            inputProps={{ maxLength: 50 }}
          />

          {/* 著者名 */}
          <TextField
            label="著者名 *"
            fullWidth
            {...register('author')}
            error={!!errors.author}
            helperText={errors.author?.message}
            inputProps={{ maxLength: 30 }}
          />

          {/* 評価（1〜5の選択） */}
          <Box>
            <Typography component="legend">評価 *</Typography>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating
                  value={field.value ?? 0}
                  onChange={(_, v) => field.onChange(v ?? 0)}
                  precision={1}
                />
              )}
            />
            {errors.rating && (
              <Typography variant="caption" color="error">
                {errors.rating.message}
              </Typography>
            )}
          </Box>

          {/* アクションボタン */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" type="button" onClick={() => router.push('/')}>
              キャンセル
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              追加する
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}