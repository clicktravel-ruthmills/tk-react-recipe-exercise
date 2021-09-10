/// <reference types="react-scripts" />
type SetDifference<A, B> = A extends B ? never : A

type SetComplement<A, A1 extends A> = SetDifference<A, A1>

type Subtract<T extends T1, T1 extends object> = Pick<
    T,
    SetComplement<keyof T, keyof T1>
    >

type Intersection<T extends object, U extends object> = Pick<
    T,
    Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
    >

declare module '@travelperksl/fabricator' {
    interface FabricatedValue<T> {
        (fabricator?: { [P in keyof T]?: T[P] }): T
        extend: <U extends T>(
            fabricator: { [P in keyof Subtract<U, T>]: () => U[P] } &
                { [P in keyof Intersection<U, T>]?: () => U[P] }
        ) => FabricatedValue<U>
        times: (
            count: number | { min?: number; max?: number },
            fabricator?: { [P in keyof T]?: () => T[P] }
        ) => Array<T>
    }
    export function Fabricator<T>(
        fabricator: { [P in keyof T]: () => T[P] }
    ): FabricatedValue<T>
    export function sequence(sequenceName?: string): number
}
