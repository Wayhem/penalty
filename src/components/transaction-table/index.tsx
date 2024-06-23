import { api, DatabaseContext } from "@/collections";
import { useContext } from "react";

export const TransactionTable = () => {
  const { username } = api.useAuth();
  const db = useContext(DatabaseContext);

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>User</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {username &&
          db.transactions[username]?.map(
            ({ id, targetUsername, tokens, status, type }, index) => (
              <tr key={id}>
                <th>{index}</th>
                <td>{targetUsername}</td>
                <td>{tokens}</td>
                <td>{status}</td>
                <td>{type}</td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
};
