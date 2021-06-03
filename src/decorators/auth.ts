import { getRegistry } from '../helpers'

export const Auth = () => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = function(...args: any[]) {
      if (getRegistry()) {
        if (
          getRegistry()
            .get('user')
            .isLogged()
        ) {
          return originalMethod.apply(this, args)
        } else {
          getRegistry()
            .get('error')
            .set('unauthorized')
        }
      }
    }
  }
}
