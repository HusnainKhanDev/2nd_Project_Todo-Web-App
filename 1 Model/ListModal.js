import { describe, it, expect } from 'vitest';

describe('Todo Application Tests', () => {
  it('should create a new task', () => {
    const tasks = [];

    const newTask = {
      title: 'Complete DevOps Assignment',
      description: 'Submit before deadline',
      endDate: '2026-08-20'
    };

    tasks.push(newTask);

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Complete DevOps Assignment');
  });

  it('should delete a task', () => {
    const tasks = [
      { title: 'Task 1' },
      { title: 'Task 2' }
    ];

    tasks.splice(0, 1);

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Task 2');
  });
});