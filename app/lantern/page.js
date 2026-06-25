import { redirect } from 'next/navigation'

// The palace scene is now the site's front door at "/". Keep old links working.
export default function LanternRedirect() {
  redirect('/')
}
