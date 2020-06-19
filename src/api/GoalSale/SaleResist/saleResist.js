import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    saleResist: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        salePrice,
        mainImage,
        introduceText,
        goalId,
        sale,
        target,
        otherCosts,
        otherCostsDesc,
        alramToken,
      } = args;
      try {
        await prisma.updateGoal({
          where: { id: goalId },
          data: {
            salePrice,
            mainImage: mainImage,
            introduceText,
            sale,
            target,
            otherCosts,
            otherCostsDesc,
            alramToken: alramToken !== null ? alramToken : null,
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
