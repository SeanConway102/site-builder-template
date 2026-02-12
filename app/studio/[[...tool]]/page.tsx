import dynamic from "next/dynamic"

const StudioPage = dynamic(() => import("next-sanity/studio").then(mod => {
  const config = require("@/sanity.config").default
  return { default: () => <mod.NextStudio config={config} /> }
}), { ssr: false })

export default function Page() {
  return <StudioPage />
}
