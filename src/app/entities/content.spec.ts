import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification type', () => {
    const content = new Content('Notification content');
    expect(content).toBeTruthy();
  });

  it('should not be able to set content if length is less than 5 characters', () => {
    expect(() => new Content('a'.repeat(4))).toThrow();
  });

  it('should not be able to set content if length is more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
