import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const dm = await draftMode()
  const slug = request.nextUrl.searchParams.get("slug") || "/"
  dm.disable()
  redirect(slug)
}
