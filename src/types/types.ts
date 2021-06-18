import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

export type methods = "GET" | "POST";
export type KoaContext = ParameterizedContext<DefaultContext, DefaultState>;
