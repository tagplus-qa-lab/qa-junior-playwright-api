import Chance from "chance";
const chance = new Chance();

export const fakeUser = {
  name: chance.name(),
  email: chance.email(),
  gender: chance.gender().toLowerCase(),
  status: chance.pickone(["active", "inactive"]),
};

export const fakePost = {
  user_id: 8208666,
  title: chance.sentence({ words: 6 }),
  body: chance.paragraph({ sentences: 5 }),
};

export const fakeComment = {
    post_id: 253611,
    name: chance.name(),
    email: chance.email(),
    body: chance.paragraph({ sentences: 2 }),
  };

