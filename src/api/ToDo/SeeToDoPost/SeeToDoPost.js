import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { POST_HISTORY_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeToDoPost: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toDoId } = args;
      return prisma
        .posts({ where: { dayTodo: { id: toDoId } } })
        .$fragment(POST_HISTORY_FRAGMENT);
    },
  },
};
