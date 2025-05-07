const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Wave API",
      version: "1.0.0",
      description: "The API collection for Task Wave",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Task Wave Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the user (MongoDB ObjectId)",
              example: "660b2cbfcd85c4b3e0d2a123",
            },
            username: {
              type: "string",
              format: "email",
              description: "User's email address (used as username)",
              example: "johndoe@gmail.com",
            },
            password: {
              type: "string",
              description: "User's hashed password",
              example: "$2b$10$1b2c3d4e5f6g7h8i9j0klmnopqrstuvwx",
            },
            name: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            focusStreak: {
              type: "integer",
              description: "Current focus streak of the user",
              example: 5,
              default: 0,
            },
          },
          required: ["username", "password", "name"],
        },
        Tasks: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the task (MongoDB ObjectId)",
              example: "66397f4c152f5e001e4d5e42",
            },
            userId: {
              type: "string",
              description: "Reference to the User who owns this task",
              example: "662afcd7f8b3b7bdf2e9d5a1",
            },
            title: {
              type: "string",
              description: "Title of the task",
              example: "Finish React assignment",
            },
            description: {
              type: "string",
              description: "Detailed description of the task",
              example: "Complete the frontend task dashboard with filtering",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Deadline for the task",
              example: "2025-05-10T18:00:00Z",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Priority level of the task",
              example: "high",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Task creation timestamp",
              example: "2025-05-06T12:30:00Z",
            },
            completed: {
              type: "boolean",
              description: "Completion status of the task",
              example: false,
            },
          },
          required: ["title", "description", "dueDate"],
        },
        FocusSession: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the focus session",
              example: "66404edabf3c5f001e6f8c91",
            },
            userId: {
              type: "string",
              description: "Reference to the User",
              example: "660b2cbfcd85c4b3e0d2a123",
            },
            taskId: {
              type: "string",
              nullable: true,
              description: "Optional reference to a Task",
              example: "66397f4c152f5e001e4d5e42",
            },
            taskName: {
              type: "string",
              description:
                "Name of the task (for display, even if taskId is not provided)",
              example: "Write blog article",
            },
            duration: {
              type: "integer",
              description: "Duration of the session in minutes",
              minLength: 5,
              example: 25,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the session was created",
              example: "2025-05-06T10:00:00Z",
            },
            startedAt: {
              type: "string",
              format: "date-time",
              description: "Session start time",
              example: "2025-05-06T10:05:00Z",
            },
            endedAt: {
              type: "string",
              format: "date-time",
              description: "Session end time",
              example: "2025-05-06T10:30:00Z",
            },
            status: {
              type: "string",
              enum: ["Success", "Interrupted"],
              description: "Status of the focus session",
              example: "Success",
            },
          },
          required: ["userId", "taskName", "duration", "startedAt", "endedAt"],
        },
      },
    },
    tags: [
      {
        name: "User",
        description: "User management and authentication API",
      },
      {
        name: "Tasks",
        description: "Tasks management API",
      },
      {
        name: "Focus Session",
        description: "API for managing focus sessions",
      },
      {
        name: "OTP",
        description: "API for handling OTP service",
      },
    ],
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
