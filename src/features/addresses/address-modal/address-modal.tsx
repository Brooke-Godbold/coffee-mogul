"use client";

import Modal from "@/ui/modal/modal";
import { useFormState, useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { addAddress } from "@/actions/addAddress";
import useFormErrors from "@/hooks/useFormErrors";
import { Document } from "mongodb";
import ModalForm from "@/ui/form/modal-form/modal-form";
import FormInput from "@/ui/form/form-input/form-input";

interface AddressModalProps {
  existingAddress?: Document;
}

export default function AddressModal({ existingAddress }: AddressModalProps) {
  return (
    <Modal>
      <Modal.Open opens="new-address">
        <button>{existingAddress ? "Edit Address" : "Add New Address"}</button>
      </Modal.Open>
      <Modal.Window name="new-address">
        <AddressForm existingAddress={existingAddress} />
      </Modal.Window>
    </Modal>
  );
}

interface AddressFormProps {
  onCloseModal?: Function;
  existingAddress?: Document;
}

function AddressForm({ onCloseModal, existingAddress }: AddressFormProps) {
  const { data } = useSession();

  const [formState, addAddressAction] = useFormState(
    addAddress.bind(null, {
      userId: data?.user?.email,
      addressId: existingAddress?.addressId,
    }),
    { errors: {} }
  );

  useFormErrors(formState, onCloseModal, "Successfully Added Address!");

  return (
    <ModalForm
      submitAction={addAddressAction}
      title={existingAddress ? "Edit Address" : "Add an Address"}
    >
      <FormInput
        label="Contact Name"
        name="name"
        defaultValue={existingAddress?.name}
        errors={formState.errors}
      />
      <FormInput
        label="Address Line 1"
        name="line1"
        defaultValue={existingAddress?.address.line1}
        errors={formState.errors}
      />
      <FormInput
        label="Address Line 2"
        name="line2"
        defaultValue={existingAddress?.address.line2}
        errors={formState.errors}
      />
      <FormInput
        label="City"
        name="city"
        defaultValue={existingAddress?.address.city}
        errors={formState.errors}
      />
      <FormInput
        label="County"
        name="state"
        defaultValue={existingAddress?.address.state}
        errors={formState.errors}
      />
      <FormInput
        label="Postcode"
        name="postal_code"
        defaultValue={existingAddress?.address.postal_code}
        errors={formState.errors}
      />
    </ModalForm>
  );
}
