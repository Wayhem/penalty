import styled from "@emotion/styled";

export const Wrapper = styled.form`
  height: calc(100% - 4rem);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding-top: 10%;

  .error-icon {
    color: oklch(var(--er));
  }
`;
