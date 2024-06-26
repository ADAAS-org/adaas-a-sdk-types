import { A_SDK_TYPES__Error } from "./A_SDK_Error.type";
import { A_SDK_TYPES__Dictionary } from "./common.types";

export type A_SDK_TYPES__ErrorsProviderConstructor = {
    namespace: string,
    errors: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error> | A_SDK_TYPES__Error[]
}