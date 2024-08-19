import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="font-bold text-4xl">Post an Item to sell</h1>
      <form
        className="p-4 border rounded-lg space-y-4 max-w-lg flex flex-col"
        action={createItemAction}
      >
        <Input required name="name" placeholder="Your Item" className="" />
        <Input
          required
          name="startingPrice"
          placeholder="At What Price you Want to Start?"
          type="float"
          className=""
        />

        <Button type="submit" className="self-end">
          Post Item
        </Button>
      </form>
    </main>
  );
}
