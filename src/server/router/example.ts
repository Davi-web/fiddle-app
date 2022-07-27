import { createRouter } from "./context";
import { z } from "zod";
import { getCharacter } from 'rickmortyapi'
import { assert } from "console";


export const exampleRouter = createRouter()
  .query("get-person-by-id", {
    input: z
      .object({
        id: z.number(),
      })
      ,
    async resolve({ input }) {
      const person = await getCharacter(input.id);
      return {
        name: person.data.name,
        image: person.data.image
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
