const LENGTH_DIGITS = 100000000;
const MIN_DIGITS = 10000;
const random = () => {
  return (
    Math.ceil(Math.random() * LENGTH_DIGITS) %
    Math.ceil(Math.random() * MIN_DIGITS)
  );
};

export default random;
