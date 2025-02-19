import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InboxScreenComponent } from './inbox-screen.component';
import { fireEvent, within } from '@storybook/test';
import { signal } from '@angular/core';
import { Task } from '../../../lib/models/task.model';
import { TaskService } from './task.service';

class MockTaskService extends TaskService {
  override tasks = signal<Task[]>([
    { id: '1', title: 'Injected Task 1', state: 'TASK_INBOX' },
    { id: '2', title: 'Injected Task 2', state: 'TASK_INBOX' },
    { id: '3', title: 'Injected Task 3', state: 'TASK_INBOX' },
  ]);
}

const meta: Meta<InboxScreenComponent> = {
  component: InboxScreenComponent,
  title: 'Organisms/PureInboxScreen',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [{ provide: TaskService, useClass: MockTaskService }],
    }),
  ],
};

export default meta;
type Story = StoryObj<InboxScreenComponent>;

export const Default: Story = {};

export const Error: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        MockTaskService,
        {
          provide: TaskService,
          useFactory: (mockService: MockTaskService) => {
            mockService.error = true;
            return mockService;
          },
          deps: [MockTaskService], // Inject the original service
        },
      ],
    }),
  ],
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
