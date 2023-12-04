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
  if (!session.user) {
    return new NextResponse("Uauthenticated", { status: 401 });
  }
  const info = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    date: z.string(),
    type: z.string().optional(),
  });
  const body: Zod.infer<typeof info> = await request.json();
  try {
    const parsebody = info.parse(body);
  } catch (e) {
    return new NextResponse(`Fields are require ${e}`, { status: 400 });
  }
  try {
    // check if already submitied a complaint
    const reception = await prisma.reception.findFirst({
      where: {
        firstAndLastName: `${body.firstName} ${body.lastName}`,
      },
    });
    if (!reception) {
      // create a new complaint
      const createNewReception = await prisma.reception.create({
        data: {
          firstAndLastName: `${body.firstName} ${body.lastName}`,
          date: body.date,
          complaintType: body.type,
        },
      });
      if (createNewReception) {
        return new NextResponse("Created successfully", {
          status: 201,
        });
      }
    }
    // update the complaint
    else {
      await prisma.reception.update({
        where: {
          id: reception.id,
        },
        data: {
          count: reception.count + 1,
        },
      });
      return new NextResponse("updated successfuly", { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return new NextResponse(
      "Somthing went wrong please try again in a minute",
      {
        status: 500,
      }
    );
  }
}
