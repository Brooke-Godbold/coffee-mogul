import { css } from "styled-components";

const BasePage = css`
  margin: 0 auto;
  width: 50%;

  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  flex: auto;

  @media (max-width: 160em) {
    width: 75%;
  }

  @media (max-width: 120em) {
    width: 90%;
  }
`;

const CommonScrollbar = css`
  &::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-600); /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-brand-400); /* color of the scroll thumb */
    border: 3px solid var(--color-brand-400); /* creates padding around scroll thumb */
  }

  scrollbar-color: var(--color-brand-600) transparent;
  scroll-padding: 3px;
`;

const CommonButton = css`
  padding: 0 1.2rem;

  background-color: var(--color-brand-200);

  font-weight: 700;

  border: none;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: scale(110%);
  }
`;

export { BasePage, CommonScrollbar, CommonButton };
