import { Button } from "@/ui";

import { DialogForm, StyledButton } from "./styles";
import { ButtonVariants } from "@/ui/button";
import { RefObject } from "react";

type Props = {
  modalRef: RefObject<HTMLDialogElement>;
  tokens?: number;
  requester?: string;
};

export const ApproveModal = ({ modalRef, tokens, requester }: Props) => {
  const onApprove = () => {};
  const onReject = () => {};

  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request approval</h3>
          <p className="py-4">
            Would you like to approve a request for {tokens} tokens from{" "}
            {requester}
          </p>
          <DialogForm method="dialog">
            <div className="modal-action">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onReject();
                }}
                variant={ButtonVariants.error}
                className="close-button"
              >
                No
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onApprove();
                }}
              >
                Yes
              </Button>
            </div>
          </DialogForm>
        </div>
      </dialog>
      <StyledButton
        onClick={(e) => {
          e.preventDefault();
          modalRef.current?.showModal();
        }}
      >
        Request transaction
      </StyledButton>
    </>
  );
};
