const photoPopulate = [
  { path: "media" },
  {
    path: "author",
    select: "id firstName lastName fullName userName bio photos avatar email",
    populate: [
      {
        path: "photos",
        options: { limit: 3 },
        populate: {
          path: "media",
          select: "url",
        },
      },
      {
        path: "avatar",
        select: "url",
      },
    ],
  },
];

const collectionPopulate = [
  {
    path: "author",
    select: "id firstName lastName fullName userName bio photos avatar email",
    populate: [
      {
        path: "photos",
        options: { limit: 3 },
      },
      {
        path: "avatar",
        select: "url",
      },
    ],
  },
  { path: "cover" },
  { path: "photos", populate: photoPopulate },
];

module.exports = { photoPopulate, collectionPopulate };
