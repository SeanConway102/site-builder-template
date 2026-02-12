import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const dm = await draftMode()
  const { searchParams } = request.nextUrl

  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug") || "/"

  // If a secret is provided, validate it
  if (secret && secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  dm.enable()
  redirect(slug)
}
