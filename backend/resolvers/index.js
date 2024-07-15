import { mergeResolvers } from "@graphql-tools/merge";
import CommentResolver from "./commentResolver.js";
import blogResolver from "./blogResolver.js";
import userResolver from "./userResolver.js";

const mergedResolvers = mergeResolvers([CommentResolver, blogResolver, userResolver]);

export default mergedResolvers;