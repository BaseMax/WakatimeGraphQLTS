// random-string.util.ts

import randomstring from 'randomstring';
import { Prisma } from '@prisma/client'; // Import the Prisma client if you haven't already

export async function generateUniqueRandomString(
  length: number,
  uniqueField: keyof Prisma.UserCreateInput, // Replace 'User' with your model name
  customeRepo: any, // Replace 'User' with your repository class name
): Promise<string> {
  while (true) {
    const randomString = randomstring.generate(length);
    const user = await customeRepo.findUnique({
      where: { [uniqueField]: randomString },
    });

    if (!user) {
      return randomString;
    }
  }
}
