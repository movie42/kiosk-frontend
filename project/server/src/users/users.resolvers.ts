import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client },
    ) => {
      const exist = await client.user.findFirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });

      if (exist) {
        return;
      }
    },
  },
};

export default resolvers;
