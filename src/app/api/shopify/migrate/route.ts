import { NextResponse } from "next/server";

import {
  getMigrationInstructions,
  listMigrationSnapshots,
  runShopifyMigration,
  type ShopifyMigrationRequest,
} from "@/lib/shopify-migration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshots = await listMigrationSnapshots();

  return NextResponse.json({
    ok: true,
    instructions: getMigrationInstructions(),
    snapshots,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ShopifyMigrationRequest;
    const result = await runShopifyMigration(body ?? {});

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Shopify migration failed.";
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 500;

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status },
    );
  }
}
