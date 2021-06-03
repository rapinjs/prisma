import {PrismaClient} from '@prisma/client'
import { User } from './plugin'
import { initRegistry } from './helpers'
import { isUndefined } from 'lodash'
export * from './decorators'

export default class KnexPlugin {
  public async afterInitRegistry({ registry }) {
    registry.set('prisma', new PrismaClient())
  }
  public async onBeforeRequest({ registry, ctx }) {
    initRegistry({ registry })
    registry.set('user', new User(registry))

    const token = !isUndefined(ctx.request.headers.token)
      ? ctx.request.headers.token
      : false

    if (token) {
      await registry.get('user').verify(token)
    } else {
      const authToken = !isUndefined(ctx.request.headers.authorization)
        ? ctx.request.headers.authorization
        : false

      if (authToken) {
        await registry.get('user').verify(authToken)
      }
    }
  }
}
