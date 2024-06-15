import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function AnswerSkelton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rectangular" width="full" height={120} />
    </Stack>
  );
}