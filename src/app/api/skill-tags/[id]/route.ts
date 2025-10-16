import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/shared/lib/prisma";

/**
 * スキルタグを更新する
 */
const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid skill tag ID" },
        { status: 400 }
      );
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Skill tag name is required" },
        { status: 400 }
      );
    }

    const skillTag = await prisma.skillTag.update({
      where: { id },
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

    return NextResponse.json(skillTag);
  } catch (error) {
    console.error("Error updating skill tag:", error);

    // Prismaのユニーク制約エラーの場合
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Skill tag with this name already exists" },
        { status: 409 }
      );
    }

    // レコードが見つからない場合
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { error: "Skill tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update skill tag" },
      { status: 500 }
    );
  }
};

/**
 * スキルタグを削除する
 */
const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid skill tag ID" },
        { status: 400 }
      );
    }

    await prisma.skillTag.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill tag:", error);

    // レコードが見つからない場合
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json(
        { error: "Skill tag not found" },
        { status: 404 }
      );
    }

    // 外部キー制約エラーの場合（実績と関連付けられている場合）
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      return NextResponse.json(
        {
          error: "Cannot delete skill tag that is associated with achievements",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete skill tag" },
      { status: 500 }
    );
  }
};

export { PUT, DELETE };
