interface ThemeArguments {
  colorScheme: 'dark' | 'light';
}

export const theme = ({ colorScheme }: ThemeArguments) => {
  return {
    color: colorScheme === 'dark' ? 'black' : 'white',
    textColor: colorScheme === 'dark' ? 'white' : 'black',

    contrast0: colorScheme === 'dark' ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',
    contrast0_5: colorScheme === 'dark' ? 'hsl(0, 0%, 5%)' : 'hsl(0, 0%, 95%)',
    contrast1: colorScheme === 'dark' ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 90%)',
    contrast2: colorScheme === 'dark' ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 80%)',
    contrast3: colorScheme === 'dark' ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 70%)',
    contrast4: colorScheme === 'dark' ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 60%)',
    contrast5: colorScheme === 'dark' ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 50%)',
    contrast6: colorScheme === 'dark' ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 40%)',
    contrast7: colorScheme === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 30%)',
    contrast8: colorScheme === 'dark' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 20%)',
    contrast9: colorScheme === 'dark' ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 10%)',
    contrast10: colorScheme === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',
  };
};
