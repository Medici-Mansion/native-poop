import type { StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

export default {
  component: Input,
};

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Hello World',
    placeholder: 'Type anything.',
  },
};
export const Error: Story = {
  args: {
    label: 'Hello World',
    placeholder: 'Type anything.',
    error: 'Oh No!',
  },
};
