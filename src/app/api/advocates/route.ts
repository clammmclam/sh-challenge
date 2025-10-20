import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

const stringIncludesSearchTerm = (str: string, searchTerm: string) => {
  return str.toLowerCase().includes(searchTerm.trim().toLowerCase());
};

const listIncludesSearchTerm = (list: string[], searchTerm: string) => {
  return list.some((item) => stringIncludesSearchTerm(item, searchTerm));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() ?? "";

  if (!searchTerm) {
    try {
      const dbData = await db.select().from(advocates);
      return Response.json({ data: dbData.length ? dbData : advocateData });
    } catch (error) {
      return Response.json({ data: advocateData });
    }
  }

  try {
    const filteredDbData = await db
      .select()
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`),
          sql`LOWER(${advocates.specialties}::text) LIKE ${
            "%" + searchTerm.toLowerCase() + "%"
          }`
        )
      );

    return Response.json({ data: filteredDbData });
  } catch (error) {
    const filteredDummyData = advocateData.filter((advocate) => {
      return (
        stringIncludesSearchTerm(
          `${advocate.firstName} ${advocate.lastName}`,
          searchTerm
        ) ||
        stringIncludesSearchTerm(advocate.city, searchTerm) ||
        stringIncludesSearchTerm(advocate.degree, searchTerm) ||
        listIncludesSearchTerm(advocate.specialties, searchTerm)
      );
    });

    return Response.json({ data: filteredDummyData });
  }
}
