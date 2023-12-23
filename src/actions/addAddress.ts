"use server";

import { FormState } from "@/hooks/useFormErrors";
import paths from "@/paths";
import { authClient } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { postcodeValidator } from "postcode-validator";
import { z } from "zod";

const addAddressSchema = z.object({
  name: z.string().min(1, { message: "Name must have at least 1 character" }),
  line1: z
    .string()
    .min(1, { message: "Address Line 1 must have at least 1 character" }),
  line2: z.string().optional(),
  city: z.string().min(1, { message: "City must have at least 1 character" }),
  state: z
    .string()
    .min(1, { message: "County must have at least 1 character" }),
  postal_code: z
    .string()
    .min(1, { message: "Post Code must have at least 1 character" }),
});

interface AddressData {
  userId: string | null | undefined;
  addressId: number;
}

export async function addAddress(
  addressData: AddressData,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!addressData.userId) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  const result = addAddressSchema.safeParse({
    name: formData.get("name"),
    line1: formData.get("line1"),
    line2: formData.get("line2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postal_code: formData.get("postal_code"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const validPostcode = postcodeValidator(
    formData.get("postal_code")?.toString() || "",
    "GB"
  );

  if (!validPostcode) {
    return {
      errors: {
        _form: ["This is an invalid Postcode"],
      },
    };
  }

  const client = await authClient;

  const newAddress = {
    name: formData.get("name"),
    address: {
      line1: formData.get("line1"),
      line2: formData.get("line2"),
      city: formData.get("city"),
      state: formData.get("state"),
      postal_code: formData.get("postal_code"),
      country: "GB",
    },
  };

  try {
    const user = await client
      ?.db()
      .collection("users")
      .findOne({ email: addressData.userId });

    if (user) {
      user.addresses = [
        ...user.addresses.filter(
          (address: { [key: string]: any }) =>
            address.addressId !== addressData.addressId
        ),
        {
          addressId:
            user.addresses.find(
              (address: { [key: string]: any }) =>
                address.addressId === addressData.addressId
            )?.addressId || Date.now(),
          ...newAddress,
        },
      ];

      await client
        ?.db()
        .collection("users")
        .replaceOne({ email: addressData.userId }, user);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Something went wrong"] } };
    }
  }

  revalidatePath(paths.addressesPath());
  return {
    errors: {},
    success: true,
  };
}
