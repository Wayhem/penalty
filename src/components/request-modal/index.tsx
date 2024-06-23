import { Button } from "@/ui";
import cn from "clsx";
import { DialogForm, StyledButton } from "./styles";
import { ButtonVariants } from "@/ui/button";
import { useContext, useRef, useState } from "react";
import { api, DatabaseContext } from "@/collections";
import { useAuth } from "@/collections/api/use-auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

type Errors = {
  username?: boolean;
  tokens?: boolean;
};

export const RequestModal = () => {
  const db = useContext(DatabaseContext);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [tokens, setTokens] = useState<string>("0");
  const [username, setUsername] = useState<string>(
    Object.values(db.users)[0].username || ""
  );
  const { createRequest } = api.useCreateRequest();
  const { username: loggedUsername } = useAuth();

  if (!loggedUsername) redirect("/login");

  const rootCnUsernameSelect = cn("select select-bordered w-full max-w-xs", {
    ["select-error"]: errors.username,
  });

  const rootCnTokenInput = cn("input input-bordered w-full max-w-xs", {
    ["input-error"]: errors.tokens,
  });

  const onSubmit = () => {
    if (parseInt(tokens) > 0 && parseInt(tokens) < 10 && username) {
      try {
        setErrors({});
        createRequest(loggedUsername, parseInt(tokens), username);
        toast("Request created successfully");
        modalRef.current?.close();
      } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        toast.error(message);
      }
    } else {
      setErrors({
        tokens: !(parseInt(tokens) > 0 && parseInt(tokens) < 10),
        username: !username,
      });
    }
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Token request</h3>
          <p className="py-4">Choose user and amount for the token request</p>
          <DialogForm method="dialog">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">User</span>
              </div>
              <select
                value={username}
                className={rootCnUsernameSelect}
                onChange={(e) => setUsername(e.target.value)}
              >
                {Object.values(db.users).map(({ username: usernameOption }) => (
                  <option key={usernameOption}>{usernameOption}</option>
                ))}
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Amount to request</span>
              </div>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="Type here"
                className={rootCnTokenInput}
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
              />
            </label>
            <div className="modal-action">
              <Button variant={ButtonVariants.default} className="close-button">
                Close
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                Confirm
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
