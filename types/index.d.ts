import { PrismaClient } from "@prisma/client";

declare module 'rapin' {
  interface Context {
    prisma: PrismaClient
    user: User
  }
}

export declare class User {
  login(email: string, password: string, override?: boolean): string | boolean
  verify(token: string): Promise<boolean>
  getId(): number
  getFirstName(): string
  getMiddleName(): string
  getLastName(): string
  getEmail(): string
  getTelephone(): string
  getImage(): string
  getRoleType(): string
  isLogged(): boolean
}

export declare const Auth: () => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void
