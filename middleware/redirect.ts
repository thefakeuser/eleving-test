import { Middleware } from '@nuxt/types'
import { SubscriptionStepRoutes } from '@/contracts/subscription'

const myMiddleware: Middleware = ({ route, redirect }) => {
  // Default redirection (due to task requirements home page is not specified)
  const contactInfoSubscriptionStep = `/subscription/${SubscriptionStepRoutes.PersonalInfo}`

  if (route.path === '/' || route.path === '/subscription') {
    return redirect(contactInfoSubscriptionStep)
  }
}

export default myMiddleware
