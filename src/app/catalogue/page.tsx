import { redirect } from "next/navigation";

/** Catalogue removed from top nav — discovery lives on Home. */
export default function CataloguePage() {
  redirect("/");
}
