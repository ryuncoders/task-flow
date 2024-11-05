"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface ICreateAccount {
  username: String;
  email: String;
  password: String;
  password2: String;
}

export async function createAccountHandle(prevState: any, formData: FormData) {
  console.log("prevState", prevState);
  console.log("formData", formData);
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  };
  // 아이디 비밀번호 검사
  const newUser = await prisma.user.create({
    data: {
      username: data.username + "",
      email: data.email + "",
      password: data.password + "",
    },
    select: {
      id: true,
    },
  });
  console.log(newUser);
  redirect("/");
}
