import { Button } from "@/ui";
import styled from "@emotion/styled";

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 5rem;
  right: 5rem;
`;

export const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  .close-button {
    margin-right: 0.5rem;
  }
`;
