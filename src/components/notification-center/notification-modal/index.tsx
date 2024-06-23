import { Button } from "@/ui";

import { DialogForm, StyledButton } from "./styles";
import { ButtonVariants } from "@/ui/button";
import { RefObject } from "react";
import { Request } from "@/collections/db/database";
import { toast } from "react-toastify";
import { api } from "@/collections";

type Props = {
  modalRef: RefObject<HTMLDialogElement>;
  request?: Request;
};

export const ApproveModal = ({ modalRef, request }: Props) => {
  const { approveRequest } = api.useApproveRequest();
  const { declineRequest } = api.useDeclineRequest();
  const { username } = api.useAuth();

  const onApprove = () => {
    try {
      approveRequest(
        username || "",
        request?.tokens || 0,
        request?.requester || "",
        request?.id || ""
      );
      modalRef.current?.close();
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      toast.error(message);
    }
  };

  const onReject = () => {
    try {
      declineRequest(
        username || "",
        request?.tokens || 0,
        request?.requester || "",
        request?.id || ""
      );
      modalRef.current?.close();
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      toast.error(message);
    }
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request approval</h3>
          <p className="py-4">
            Would you like to approve a request for {request?.tokens} tokens
            from {request?.requester}
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
