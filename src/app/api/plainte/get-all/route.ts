import { roles } from "@/utils/session";
import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/script";

export async function GET(request: NextRequest) {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.user) {
    return new NextResponse("Uauthenticated", { status: 401 });
  }

  const searchParam = request.nextUrl.searchParams.get("searchSNumber");

  try {
    const data = await prisma.plainte.findMany({
      where: {
        correspondenceNumber: {
          contains: searchParam ? searchParam : undefined,
        },
      },
      include: {
        recipients: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new NextResponse(`No data here`, { status: 404 });
  }
}
