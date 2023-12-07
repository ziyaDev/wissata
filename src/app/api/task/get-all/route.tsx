import { roles } from "@/utils/session";
import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/script";
import { TasksType } from "@/types";

export async function GET(request: NextRequest) {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.user) {
    return new NextResponse("Uauthenticated", { status: 401 });
  }

  try {
    const data = await prisma.tasks.findMany({
      where: {
        users: {
          hasSome: [session.user.userID],
        },
      },
    });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new NextResponse(`No data here`, { status: 404 });
  }
}
