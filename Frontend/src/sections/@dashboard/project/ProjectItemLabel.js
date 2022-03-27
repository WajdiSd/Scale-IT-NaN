import { useTheme } from '@emotion/react';

// components
import Label from 'src/components/Label';
import { sentenceCase } from 'change-case';

export default function ProjectItemLabel({ isDeleted, status, respectsDeadline }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const color = () => {
    if (status === 'finished') return 'success';
    if (status === 'finished with delay') return 'error';

    return respectsDeadline ? 'warning' : 'in_progress' && 'secondary';
  };

  if (isDeleted) {
    return (
      <Label
        sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
        variant={isLight ? 'ghost' : 'filled'}
        color="default"
      >
        {/* import sentence case */}
        {sentenceCase('deleted')}
      </Label>
    );
  }

  if (status === 'aborted') {
    return (
      <Label
        sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
        variant={isLight ? 'ghost' : 'filled'}
        color="error"
      >
        {/* import sentence case */}
        {sentenceCase('aborted')}
      </Label>
    );
  }
  if (status === 'started') {
    return (
      <Label
        sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
        variant={isLight ? 'ghost' : 'filled'}
        color={color()}
      >
        {respectsDeadline ? sentenceCase('overdue') : sentenceCase('in progress')}
      </Label>
    );
  }
  return (
    <Label
      sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
      variant={isLight ? 'ghost' : 'filled'}
      color={color()}
    >
      {status === 'finished' ? sentenceCase('completed') : sentenceCase('completed after delay')}
    </Label>
  );
}
