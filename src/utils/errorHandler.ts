import { ValidationError } from "sequelize";

export function handleError(error: unknown) {
  let status = 500;
  let errors: Record<string, string> = {};

  if (error instanceof ValidationError) {
    status = 400;
    errors = {};

    for (const e of error.errors) {
      errors[e.path as string] = e.message;
    }
  }

  return {
    status,
    body: {
      errors,
      message: (error as Error).message,
    },
  };
}
