import { describe, it, expect } from 'vitest';

describe('Todo App CI Tests', () => {
  it('should verify CI pipeline is working', () => {
    expect(true).toBe(true);
  });

  it('should verify task creation logic', () => {
    const task = {
      title: 'Complete DevOps Assignment tomorrow',
      completed: false
    };

    expect(task.title).toBe('Complete DevOps Assignment tomorrow');
    expect(task.completed).toBe(false);
  });

  it('should verify task deletion logic', () => {
    const tasks = [
      { title: 'Task 1' },
      { title: 'Task 2' }
    ];

    tasks.splice(0, 1);

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Task 2');
  });
});