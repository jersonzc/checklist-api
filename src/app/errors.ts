type CodeAndMessage = {
  [key: string]: (target: string) => string;
};

export const PRISMA_ERRORS: CodeAndMessage = {
  P2002: (target: string) => `${target} already exist.`,
};
