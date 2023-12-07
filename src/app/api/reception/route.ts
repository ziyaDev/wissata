import { roles } from "@/utils/session";
import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../prisma/script";
import { NextResponse } from "next/server";
import { receptionType } from "@/types";

export async function POST(request: Request) {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.user) {
    return new NextResponse("Uauthenticated", { status: 401 });
  }

  const body: Zod.infer<typeof receptionType> = await request.json();
  try {
    const parsebody = receptionType.parse(body);
  } catch (e) {
    return new NextResponse(`Fields are require ${e}`, { status: 400 });
  }
  try {
    // check if already submitied a complaint
    const reception = await prisma.reception.findFirst({
      where: {
        fullName: {
          equals: body.fullName,
        },
      },
    });

    if (!reception) {
      const { date, note, ...restData } = body; // create a new complaint
      const createNewReception = await prisma.reception.create({
        data: {
          ...restData,
          visited: {
            createMany: {
              data: [
                {
                  date: date,
                  note: note,
                },
              ],
            },
          },
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
          visited: {
            createMany: {
              data: [
                {
                  date: body.date,
                  note: body.note,
                },
              ],
            },
          },
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
