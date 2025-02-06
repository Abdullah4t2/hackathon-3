import { type SchemaTypeDefinition } from "sanity";
import { categorySchema } from "../categories";
import { productSchema } from "../products";
import orderschema from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema ,orderschema],
};