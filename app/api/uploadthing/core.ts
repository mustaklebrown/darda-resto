import { createUploadthing, type FileRouter } from 'uploadthing/next';
// import { auth } from '@/lib/auth'; // or clerk

const f = createUploadthing();

export const ourFileRouter = {
  plateImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    // .middleware(async () => {
    //   const user = await auth();
    //   if (!user) throw new Error('Unauthorized');
    //   return {};
    // })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
  categoryImage: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
