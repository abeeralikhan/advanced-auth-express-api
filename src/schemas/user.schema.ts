import { object, string, TypeOf } from "zod";

const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be minimum 6 characters long "),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export default createUserSchema;
