import { roles } from "@/utils/session";
import { sessionOptions } from "@/utils/session-config";
import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "../../../../prisma/script";
import { NextResponse } from "next/server";
import { plainteType } from "@/types";

export async function POST(request: Request) {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (!session.user) {
    return new NextResponse("Uauthenticated", { status: 401 });
  }

  const body: Zod.infer<typeof plainteType> = await request.json();
  try {
    const parsebody = plainteType.parse(body);
  } catch (e) {
    return new NextResponse(`Fields are require ${e}`, { status: 400 });
  }

  try {
    const { recipients: receptionData, ...bodyWithoutRec } = body;
    const receptionId = Number(request.headers.get("RESID"));

    await prisma.plainte.create({
      data: {
        ...bodyWithoutRec,
        sourcePlaint: receptionId ? "RECEPTION" : bodyWithoutRec.sourcePlaint,
        recipients: {
          createMany: {
            data: receptionData.map((rec) => {
              return {
                sector: rec.sector,
                reciption: rec.reciption,
                town: rec.town,
                save: rec.save,
              };
            }),
          },
        },
      },
    });
    if (receptionId) {
      await prisma.reception.update({
        where: {
          id: receptionId,
        },
        data: {
          submited: true,
        },
      });
    }
    return new NextResponse("Created ", {
      status: 201,
    });
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
