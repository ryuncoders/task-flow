"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session/get";
import { redirect } from "next/navigation";

export async function login(prev: any, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.userId = user.id + "";
    session.uesrname = user.username;
    session.isLoggedIn = true;

    await session.save();

    return redirect("/home");
  } else {
    return "error: you are not account";
  }
}
