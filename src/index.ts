import fp from "fastify-plugin";
import { validatorCompilerFactory } from "./validator-compiler.js";
import { serializerCompilerFactory } from "./serializer-compiler.js";

import type { TSchema } from "@sinclair/typebox";

const name = "@joshuaavalon/fastify-plugin-typebox";

interface Options {
  references?: TSchema[] | undefined;

  /**
   * Use `default` in schema.
   *
   * Default to `true`.
   */
  useDefault?: boolean;

  /**
   * Enable validatorCompiler.
   *
   * Default to `true`.
   */
  validatorCompiler?: boolean;

  /**
   * Enable serializerCompiler.
   *
   * Default to `true`.
   */
  serializerCompiler?: boolean;

  /**
   * Remove excess properties from a value during serialization.
   * If set to `false`, `additionalProperties` can be used to throw error when excess properties are sent.
   *
   * Default to `true`.
   */
  removeExtra?: boolean;
}

export default fp<Readonly<Options>>(
  async (app, opts) => {
    const { serializerCompiler = true, validatorCompiler = true, references = [], useDefault = true, removeExtra = true } = opts;
    if (validatorCompiler) {
      app.setValidatorCompiler(validatorCompilerFactory({ references, useDefault }));
    }
    if (serializerCompiler) {
      app.setSerializerCompiler(serializerCompilerFactory({ references, useDefault, removeExtra }));
    }
  },
  {
    name,
    fastify: "4.x",
    dependencies: []
  }
);

export * from "./error.js";
