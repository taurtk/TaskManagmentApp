request = require('supertest');
const server = require('./app'); // Adjust the path to where your server is exported

describe('Task API', () => {
 it('should add a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test task.',
      status: 'To Do',
    };

    const response = await request(server) // Use the server instance here
      .post('/tasks')
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', newTask.title);
    expect(response.body).toHaveProperty('description', newTask.description);
    expect(response.body).toHaveProperty('status', newTask.status);
 });
});