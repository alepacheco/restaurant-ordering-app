interface ThemeArguments {
  colorScheme: 'dark' | 'light';
}

export const theme = ({ colorScheme }: ThemeArguments) => {
  return {
    color: colorScheme === 'dark' ? 'black' : 'white',
    textColor: colorScheme === 'dark' ? 'white' : 'black',
  };
};
