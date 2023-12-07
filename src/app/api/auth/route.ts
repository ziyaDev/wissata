import { roles } from "@/utils/session";
import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../prisma/script";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (session.user) {
    return new NextResponse("Your already authenticated", { status: 200 });
  }
  const loginCredentials = z.object({
    userName: z.string(),
    password: z.string(),
  });
  const body: Zod.infer<typeof loginCredentials> = await request.json();
  try {
    const parsebody = loginCredentials.parse(body);
  } catch (e) {
    return new NextResponse("Fields are require", { status: 400 });
  }
  try {
    const getUser = await prisma.users.findUnique({
      where: {
        userName: body.userName,
      },
    });
    if (!getUser) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const checkPass = getUser.password === body.password;
    console.log(checkPass);
    if (!checkPass) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    session.user = {
      userID: getUser.id,
      role: roles.ADMIN,
      firstName: getUser.firstName,
      lastName: getUser.lastName,
      isAuthenticated: true,
    };
    await session.save();
    return new NextResponse("Login successful", {
      status: 200,
    });
  } catch {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
}
