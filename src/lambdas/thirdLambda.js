import unrelated from './shared/unrelated-module';

export default () => {
  unrelated();
  console.log('I am an es6 lambda!');
}