import { api, DatabaseContext } from "@/collections";
import { useContext, useRef, useState } from "react";
import { ApproveModal } from "./notification-modal";
import { Request } from "@/collections/db/database";

export const NotificationCenter = () => {
  const { username, tokens } = api.useAuth();
  const db = useContext(DatabaseContext);
  const { logout } = api.useLogout();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<Request>();

  return username ? (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
              {db.requests[username]?.length > 0 && (
                <circle fill="#e60000" stroke="#b30000" cx="16" cy="6" r="3" />
              )}
            </svg>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {db.requests[username]?.map(({ id, requester, tokens }, index) => (
            <li key={id}>
              <a
                onClick={() => {
                  setRequest({ id, requester, tokens });
                  modalRef.current?.showModal();
                }}
              >
                Request from {requester} for {tokens} tokens
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => logout()}>
            <a>Logout</a>
          </li>
          <li>
            <a>Tokens: {tokens}</a>
          </li>
        </ul>
      </div>
      <ApproveModal modalRef={modalRef} request={request} />
    </>
  ) : (
    <></>
  );
};
