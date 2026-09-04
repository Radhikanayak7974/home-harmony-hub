import { createServerFn } from "@tanstack/react-start";
import { properties, Property } from "@/lib/data";

export interface PropertyFilterParams {
  city?: string;
  type?: string;
  maxPrice?: number;
  minPrice?: number;
  searchQuery?: string;
}

/**
 * Backend API Server Function: Get Filtered Property Listings
 */
export const getPropertiesFn = createServerFn({ method: "POST" })
  .validator((data: PropertyFilterParams) => data)
  .handler(async ({ data }): Promise<Property[]> => {
    let result = [...properties];

    if (data.city && data.city !== "all") {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(data.city!.toLowerCase())
      );
    }

    if (data.type && data.type !== "all") {
      result = result.filter((p) =>
        p.type.toLowerCase().includes(data.type!.toLowerCase())
      );
    }

    if (data.maxPrice) {
      result = result.filter((p) => p.price <= data.maxPrice!);
    }

    if (data.minPrice) {
      result = result.filter((p) => p.price >= data.minPrice!);
    }

    if (data.searchQuery) {
      const q = data.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  });

/**
 * Backend API Server Function: Get Single Property By ID
 */
export const getPropertyByIdFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<Property | null> => {
    const found = properties.find((p) => p.id === data.id);
    return found || null;
  });
