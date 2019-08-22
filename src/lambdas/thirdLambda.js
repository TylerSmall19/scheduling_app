import unrelated from './shared/unrelated-module';

export const handler = () => {
  unrelated();
  console.log('I am an es6 lambda!');
}