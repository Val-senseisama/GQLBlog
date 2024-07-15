import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./userTypeDef.js";
import blogTypeDef from "./blogTypeDef.js";
import commentTypeDef from "./commentTypeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, blogTypeDef, commentTypeDef]);

export default mergedTypeDefs;