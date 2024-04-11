import type { StoryObj, Meta } from '@storybook/react';
import { Button } from '@/components/ui/button';

export default {
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['s', 'md', 'lg'],
    },
  },
} satisfies Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Hello World',
    size: 'md',
    variant: 'vertical',
    secondary: {
      label: 'Secondary',
    },
  },
};
export const Disabled: Story = {
  args: {
    label: 'Hello World',
    disabled: true,
    size: 'md',
    secondary: {
      label: 'Secondary',
    },
  },
};
