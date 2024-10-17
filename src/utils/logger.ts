// import pino from "pino";
// import pinoCaller from "pino-caller";
// import type { PrettyOptions } from "pino-pretty";

// const DEFAULT_TRANSPORT: pino.TransportTargetOptions<PrettyOptions> = {
//   target: "pino-pretty",
//   level: "info",
//   options: {
//     translateTime: "HH:MM:ss Z",
//     ignore: "pid,hostname",
//     colorize: true,
//   },
// };

// const MULTI_LOGGER = pino({
//   name: "collab-text-editor-api", // this will add `name` to every logged object
//   redact: ["req.headers.authorization"],
//   level: "info",
//   transport: {
//     targets: [DEFAULT_TRANSPORT],
//   },
// });

// export const logger = pinoCaller(MULTI_LOGGER);
