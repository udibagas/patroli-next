"use server";
import bcrypt from "bcrypt";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../lib/session";
import User from "@/models/User";

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  const user = await User.findOne({ where: { name } });

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return {
      message: "Invalid email or password",
    };
  }

  await createSession(user);
  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
