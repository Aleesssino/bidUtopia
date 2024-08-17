import { database } from "@/db/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import { SignOut } from "@/components/sign-out";
import { items } from "@/db/schema";

export default async function Home() {
  const allItems = await database.query.items.findMany();
  const session = await auth();
  // if (!session) return null;
  // const user = session.user; // Removed unnecessary await
  // if (!user) return null;

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!, // Using the non-nullable user ID
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Your Item" />{" "}
        {/* Fixed the input name attribute */}
        <Button type="submit">Post Item</Button> {/* Capitalized button text */}
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
