import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/shared/lib/prisma";

/**
 * スキルタグ一覧を取得する
 */
const GET = async () => {
  try {
    const skillTags = await prisma.skillTag.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(skillTags);
  } catch (error) {
    console.error("Error fetching skill tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill tags" },
      { status: 500 }
    );
  }
};

/**
 * 新しいスキルタグを作成する
 */
const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Skill tag name is required" },
        { status: 400 }
      );
    }

    const skillTag = await prisma.skillTag.create({
      data: {
        name: name.trim(),
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(skillTag, { status: 201 });
  } catch (error) {
    console.error("Error creating skill tag:", error);

    // Prismaのユニーク制約エラーの場合
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Skill tag with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create skill tag" },
      { status: 500 }
    );
  }
};

export { GET, POST };
