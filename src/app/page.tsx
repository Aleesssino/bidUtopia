import { database } from "@/db/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { items } from "@/db/schema";

export default async function Home() {
  const allItems = await database.query.items.findMany();
  const session = await auth();
  // if (!session) return null;
  // const user = session.user; // Removed unnecessary await
  // if (!user) return null;

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="font-bold text-4xl">Itmes for sale</h1>
      {/* <form */}
      {/*   className="p-4 border rounded-lg space-y-4 max-w-lg flex flex-col" */}
      {/*   action={async (formData: FormData) => { */}
      {/*     "use server"; */}
      {/*     await database.insert(items).values({ */}
      {/*       name: formData.get("name") as string, */}
      {/*       userId: session?.user?.id!, // Using the non-nullable user ID */}
      {/*     }); */}
      {/*     revalidatePath("/"); */}
      {/*   }} */}
      {/* > */}
      {/*   <Input name="name" placeholder="Your Item" className="" />{" "} */}
      {/*   {/* Fixed the input name attribute */}
      {/*   <Button type="submit" className="self-end"> */}
      {/*     Post Item */}
      {/*   </Button> */}
      {/*   {/* Capitalized button text */}
      {/* </form> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allItems.map((item) => (
          <div key={item.id} className="border p-4 sm:p-6 md:p-8 rounded-2xl">
            {item.name}
            starting price: {item.startingPrice / 100},-
          </div>
        ))}
      </div>
    </main>
  );
}
