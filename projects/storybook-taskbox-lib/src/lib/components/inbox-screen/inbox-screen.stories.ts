import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { InboxScreenComponent } from './inbox-screen.component';
import { fireEvent, within } from '@storybook/test';

const meta: Meta<InboxScreenComponent> = {
  component: InboxScreenComponent,
  title: 'PureInboxScreen',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText('pinTask-1'));
    // Simulates pinning the third task
    await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  },
};
