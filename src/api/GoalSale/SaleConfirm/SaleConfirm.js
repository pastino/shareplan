import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";

export default {
  Mutation: {
    saleConfirm: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId, saleConfirm, saleRejectText } = args;
      const goal = await prisma.goal({ id: goalId });
      const goalAlarmToken = goal.alramToken;
      try {
        await prisma.updateGoal({
          where: { id: goalId },
          data: {
            sale: saleConfirm,
            saleRejectText: saleConfirm === "반려" ? saleRejectText : null,
          },
        });
        if (goalAlarmToken !== null && saleConfirm === "승인") {
          const { data } = await axios.post(
            "https://exp.host/--/api/v2/push/send",
            {
              to: goalAlarmToken,
              title: "판매 승인 완료",
              body: `"${goal.goalText}" 판매 승인이 완료되었습니다.`,
            }
          );
        } else if (goalAlarmToken !== null && saleConfirm === "반려") {
          const { data } = await axios.post(
            "https://exp.host/--/api/v2/push/send",
            {
              to: goalAlarmToken,
              title: "판매 미승인",
              body: `"${goal.goalText}" 판매 승인이 거절되었습니다.`,
            }
          );
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
