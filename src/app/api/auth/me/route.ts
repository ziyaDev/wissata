import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.user) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const {
    user: { role, ...userWithoutRole },
    ...sessionWithoutSensitiveData
  } = session;
  return new NextResponse(JSON.stringify(userWithoutRole), {
    status: 200,
  });
}
