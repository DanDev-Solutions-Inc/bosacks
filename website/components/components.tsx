export const components = {
  marks: {
    link: ({ value, children }: any) => {
      return (
        <a href={value?.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};
